import Category, { ICategory } from '../models/category.model';


export const UserService = {
  getAll: async (): Promise<ICategory[]> => {
    const categories = await Category.find()
    return categories;
  }
};