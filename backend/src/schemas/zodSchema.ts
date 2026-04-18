import { z } from "zod";


export const SummarySchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, "Invalid year")
    .transform(Number)
    .optional(),
  category: z
    .string()
    .min(1)
    .optional(),
  quarter:z
    .enum(["Q1", "Q2", "Q3", "Q4"])
    .optional()
});

export const trendQuerySchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, "Invalid year")
    .transform(Number)
    .optional(),
  category: z
    .string()
    .min(1)
    .optional(),
  quarter:z
    .enum(["Q1", "Q2", "Q3", "Q4"])
    .optional(),
  groupBy:z
    .enum(["month", "quarter" ])
});


export const comparisionSchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, "Invalid year")
    .transform(Number)
    .optional(),
  metric:z
    .enum(["revenue", "profit", "units"]),
  groupBy:z
    .enum(["month", "quarter" ])
});
export const growthSchema = z.object({
  category: z
    .string()
    .min(1)
    .optional(),
  metric:z
    .enum(["revenue", "profit", "units"]),
  groupBy:z
    .enum(["month", "quarter", "year"])
});
export const forecastSchema = z.object({
  category: z
    .string()
    .min(1)
    .optional(),
  metric:z
    .enum(["revenue", "units", "profit"]),
  groupBy:z
    .enum(["month", "quarter", "year"])
});

export const queryRequestSchema = z.object({
  query: z.string().min(1)
});

export const AIQuerySchema = z.object({
  queryType: z.enum(["trends", "comparison", "growth", "forecast", "invalid"]),
  metric: z.enum(["revenue", "units", "profit"]).nullable(),
  category: z.enum(["Electronics", "Clothing", "Home", "Sports"]).nullable(),
  year: z.string().nullable(),
  quarter: z.enum(["Q1", "Q2", "Q3", "Q4"]).nullable()
});
