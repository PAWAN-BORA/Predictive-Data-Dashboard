import { z } from "zod";

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
    .enum(["revenue", "units"]),
  groupBy:z
    .enum(["month", "quarter" ])
});
export const growthSchema = z.object({
  category: z
    .string()
    .min(1)
    .optional(),
  metric:z
    .enum(["revenue", "units"]),
  groupBy:z
    .enum(["month", "quarter", "year"])
});
export const forecastSchema = z.object({
  category: z
    .string()
    .min(1)
    .optional(),
  metric:z
    .enum(["revenue", "units"]),
  groupBy:z
    .enum(["month", "quarter", "year"])
});
