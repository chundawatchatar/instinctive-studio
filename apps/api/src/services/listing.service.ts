import Listing, { IListing } from '../models/listing.model';


export const UserService = {
  getAll: async (): Promise<IListing[]> => {
    const categories = await Listing.find()
    return categories;
  }
};