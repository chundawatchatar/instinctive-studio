import { Request, Response, NextFunction } from 'express';
import Category from '../models/category.model';


export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const categories = await Category.find({}).select('name slug').lean();

    const formatted = categories.map(cat => ({
      ...cat,
      _id: cat._id.toString()
    }));

    res.json({ categories: formatted });
  } catch (error) {
    console.error('Categories API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
