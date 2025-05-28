import express, { Request, Response, NextFunction } from 'express';
import Category from '../models/category.model';
import Listing from '../models/listing.model';

const router = express.Router();

interface SearchFilters {
  [key: string]: any;
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const q = (req.query.q as string) || '';
    const category = (req.query.category as string) || '';
    const filtersParam = (req.query.filters as string) || '{}';
    const page = parseInt((req.query.page as string) || '1');
    const limit = parseInt((req.query.limit as string) || '20');

    let filters: SearchFilters = {};
    try {
      filters = JSON.parse(decodeURIComponent(filtersParam));
    } catch (e) {
      console.error('Error parsing filters:', e);
    }

    const query: any = {};

    if (q) {
      query.$text = { $search: q };
    }

    let categoryDoc = null;
    if (category) {
      categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.categoryId = categoryDoc._id;
      }
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'price' && typeof value === 'object') {
        const priceFilter = value as { min?: number; max?: number };
        query.price = {};
        if (priceFilter.min !== undefined) query.price.$gte = priceFilter.min;
        if (priceFilter.max !== undefined) query.price.$lte = priceFilter.max;
      } else if (Array.isArray(value)) {
        query[`attributes.${key}`] = { $in: value };
      } else {
        query[`attributes.${key}`] = value;
      }
    });

    const skip = (page - 1) * limit;
    const results = await Listing.find(query)
      .populate('categoryId', 'name slug')
      .sort(q ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Listing.countDocuments(query);

    let facets = [];
    if (categoryDoc && categoryDoc.attributeSchema) {
      facets = await generateFacets(categoryDoc, query);
    }

    res.json({
      results: results.map(result => ({
        ...result,
        _id: result._id.toString(),
        categoryId: result.categoryId?._id?.toString?.() ?? '',
      })),
      facets,
      total,
      page,
      limit,
      hasMore: total > page * limit
    });

  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Facets generator
async function generateFacets(category: any, baseQuery: any) {
  const facets = [];

  for (const [key, schema] of Object.entries(category.attributeSchema)) {
    const attributeSchema = schema as any;

    if (attributeSchema.type === 'string' && attributeSchema.options) {
      const pipeline = [
        { $match: { ...baseQuery, categoryId: category._id } },
        { $group: { _id: `$attributes.${key}`, count: { $sum: 1 } } },
        { $match: { _id: { $ne: null } } },
        { $sort: { count: -1 } }
      ];

      const results = await Listing.aggregate(pipeline);

      facets.push({
        key,
        label: attributeSchema.label,
        type: 'checkbox',
        options: results.map(r => ({
          value: r._id,
          count: r.count,
          label: r._id
        }))
      });
    }
  }

  return facets;
}
