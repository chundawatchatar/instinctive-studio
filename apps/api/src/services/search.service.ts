import Category from "../models/category.model";
import Listing from "../models/listing.model";

interface SearchFilters {
  [key: string]: any;
}

const searchListings = async (params: {
  q?: string;
  categorySlug?: string;
  filters?: SearchFilters;
  page: number;
  limit: number;
}) => {
  const {
    q = "",
    categorySlug = "",
    filters = {},
    page = 1,
    limit = 20,
  } = params;

  const query: any = {};
  if (q) query.$text = { $search: q };

  let categoryDoc = null;
  if (categorySlug) {
    categoryDoc = await Category.findOne({ slug: categorySlug });
    if (categoryDoc) query.categoryId = categoryDoc._id;
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (key === "price" && typeof value === "object") {
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
    .populate("categoryId", "name slug")
    .sort(q ? { score: { $meta: "textScore" } } : { createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Listing.countDocuments(query);
  const facets = categoryDoc?.attributeSchema
    ? await generateFacets(categoryDoc, query)
    : [];

  return {
    results,
    facets,
    total,
    page,
    limit,
    hasMore: total > page * limit,
  };
};

const generateFacets = async (category: any, baseQuery: any) => {
  const facets = [];

  for (const [key, schema] of Object.entries(category.attributeSchema)) {
    const attributeSchema = schema as any;

    if (attributeSchema.type === "string" && attributeSchema.options) {
      const pipeline = [
        { $match: { ...baseQuery, categoryId: category._id } },
        { $group: { _id: `$attributes.${key}`, count: { $sum: 1 } } },
        { $match: { _id: { $ne: null } } },
        { $sort: { count: -1 as 1 | -1 } },
      ];

      const results = await Listing.aggregate(pipeline);

      facets.push({
        key,
        label: attributeSchema.label,
        type: "checkbox",
        options: results.map((r) => ({
          value: r._id,
          count: r.count,
          label: r._id,
        })),
      });
    }
  }

  return facets;
}

export const SearchService = {
  searchListings,
};
