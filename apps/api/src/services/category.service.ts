import Category, { ICategory } from "../models/category.model";

const getAll = async (): Promise<ICategory[]> => {
  const categories = await Category.find();
  return categories;
};

export const CategoryService = {
  getAll,
};
