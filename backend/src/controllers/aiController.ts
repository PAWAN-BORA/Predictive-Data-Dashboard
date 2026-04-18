import { queryRequestSchema, trendQuerySchema } from "../schemas/zodSchema.js";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import aiService from "../services/aiService.js";

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
    // const { year, category, quarter, groupBy } = parsed.data;
    res.json({text:"this is test data for ai to generate."})
    // const parsed = queryRequestSchema.safeParse(req.body);
    // if (!parsed.success) {
    //   throw new ApiError(400,  "Invalid query params", parsed.error.flatten())
    // }
    // const { query } = parsed.data;
    // const result = await aiService.parseQuery(query);
    //
    // res.json(result);
  } catch(err) {
    next(err); // forward errors to error-handling middleware
  }
}
