import { Router } from "express";
import { getSummaryStats, getCategoryBreakdown, getTrends, getComparision, getGrowth, getForecast } from "../controllers/dataController.js";
import cors from "cors";

const dashboardRoute = Router();
dashboardRoute.use(cors())
dashboardRoute.get("/summary",getSummaryStats);
dashboardRoute.get("/cate-breakdown",getCategoryBreakdown);
dashboardRoute.get("/trends", getTrends);
dashboardRoute.get("/comparision", getComparision);
dashboardRoute.get("/growth", getGrowth);
dashboardRoute.get("/forecast", getForecast);

export default dashboardRoute;
