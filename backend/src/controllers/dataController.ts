import type { Request, Response, NextFunction } from "express";
import dataService from "../services/dataService.js";
import { comparisionSchema, forecastSchema, growthSchema, trendQuerySchema } from "../schemas/trendsSchema.js";
import { ApiError } from "../utils/apiError.js";
import { ca } from "zod/v4/locales";

type QueryParam = {
  year?: string;
  quarter?: string;
  category?: string;
};

export async function getSummaryStats(req: Request, res: Response, next: NextFunction) {
  try {
    const { year, quarter, category } = req.query;

    const parsedYear = year ? Number(year) : undefined;
    const parsedQuarter = typeof quarter === "string" ? quarter.toUpperCase() : undefined;;
    const parsedCategory = typeof category == "string" ?category:undefined
  
    const data = await dataService.getSummary({
      year:parsedYear,
      quarter:parsedQuarter,
      category:parsedCategory,
    });
    res.json(data);
  } catch (err) {
    next(err); // forward errors to error-handling middleware
  }
}
export async function getTrends(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = trendQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new ApiError(400,  "Invalid query params", parsed.error.flatten())
    }
    const { year, category, groupBy } = parsed.data;
    const params = {
      year:year,
      category:category
    }
    let data = {}
    if(groupBy=="month"){
      data = await dataService.getMonthlyTrend(params)
    } else {
      data = await dataService.getQuartrlyTrend(params)
    }
    res.json({data})
  } catch (err) {
    next(err); // forward errors to error-handling middleware
  }
}

export async function getCategoryBreakdown(req: Request, res: Response, next: NextFunction) {
  try {
    const { year, quarter } = req.query;
    const parsedYear = year ? Number(year) : undefined;
    const parsedQuarter = typeof quarter === "string" ? quarter.toUpperCase() : undefined;;
    const data = await dataService.categoryWiseData({
      year:parsedYear,
      quarter:parsedQuarter,
    });
    res.json({
      series:data
    });
  } catch (err) {
    next(err); 
  }
}


export async function getComparision(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = comparisionSchema.safeParse(req.query);
    if (!parsed.success) {
      throw new ApiError(400,  "Invalid query params", parsed.error.flatten())
    }
    const { metric, year, groupBy} = parsed.data;
    
    let data = await dataService.getComparisonData({
      year:year,
      metric:metric,
      groupBy:groupBy,
    })
    res.json({data})
  } catch (err) {
    next(err); 
  }
}

export async function getGrowth(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = growthSchema.safeParse(req.query);
    if (!parsed.success) {
      throw new ApiError(400,  "Invalid query params", parsed.error.flatten())
    }
    const { metric, groupBy, category} = parsed.data;
    
    let data = await dataService.getGrowthData({
      metric:metric,
      groupBy:groupBy,
      category:category,
    })
    res.json({data})
  } catch (err) {
    next(err); 
  }
}

export async function getForecast(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = forecastSchema.safeParse(req.query);
    if (!parsed.success) {
      throw new ApiError(400,  "Invalid query params", parsed.error.flatten())
    }
    const { metric, groupBy, category} = parsed.data;
    
    let data = await dataService.getForecastData({
      metric:metric,
      groupBy:groupBy,
      category:category,
    })
    res.json({data})
  } catch (err) {
    next(err); 
  }
}

