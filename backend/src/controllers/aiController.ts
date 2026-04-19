import { queryRequestSchema, trendQuerySchema } from "../schemas/zodSchema.js";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import aiService from "../services/aiService.js";
import dataService from "../services/dataService.js";

export async function handleAIQuery(req: Request, res: Response, next:NextFunction) {

  try {
    const parsed = queryRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400,  "Invalid query params", parsed.error.flatten())
    }
    const { query } = parsed.data;
    const result = await aiService.parseQuery(query);

    res.json(result);
  } catch(err) {
    next(err); 
  }
}
export async function getAISummary(req: Request, res: Response, next:NextFunction) {

  try {
    const parsed = trendQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new ApiError(400,  "Invalid query params", parsed.error.flatten())
    }
    const { year, category, quarter, groupBy } = parsed.data;
    const params = {
      year:year,
      category:category,
      quarter:quarter,
    }
    let data = {}
    if(groupBy=="month"){
      data = await dataService.getMonthlyTrend(params)
    } else {
      data = await dataService.getQuartrlyTrend(params)
    }
    const summaryData = await aiService.getSummary(data);
    res.json(summaryData)
  } catch(err) {
    next(err); // forward errors to error-handling middleware
  }
}
