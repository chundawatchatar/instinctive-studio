import { Request, Response } from "express";
import { SearchService } from "../services/search.service";

const getLimit = (queryLimit: any, defaultLimit = 20, maxLimit = 50) => {
  const limit = parseInt(queryLimit, 10) || defaultLimit;
  return Math.min(limit, maxLimit);
}


const search = async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string) || "";
    const category = (req.query.category as string) || "";
    const filtersParam = (req.query.filters as string) || "{}";
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = getLimit(req.query.limit)
    
    let filters = {};
    try {
      filters = JSON.parse(decodeURIComponent(filtersParam));
    } catch (err) {
      console.warn("Failed to parse filters:", err);
    }

    const results = await SearchService.searchListings({
      q,
      categorySlug: category,
      filters,
      page,
      limit,
    });

    res.json(results);
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const searchController = {
  search,
};
