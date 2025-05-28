import seedCategories from "./category";
import seedListings from "./listing";

export default async () => {
  if (process.env.SEED_DATA === "true") {
    await seedCategories();
    await seedListings();
  }
};
