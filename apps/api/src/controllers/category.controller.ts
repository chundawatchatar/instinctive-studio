import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/category.service";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await CategoryService.getAll();
    res.json(categories);
  } catch (error) {
    console.error("Categories API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const CategoryController = {
  getAll,
};
