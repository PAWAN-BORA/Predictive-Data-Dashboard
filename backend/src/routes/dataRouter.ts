import { Router } from "express";
import { getSummaryStats, getCategoryBreakdown, getTrends, getComparision, getGrowth, getForecast } from "../controllers/dataController.js";

const dataRouter = Router();
dataRouter.get("/summary",getSummaryStats);
dataRouter.get("/cate-breakdown",getCategoryBreakdown);
dataRouter.get("/trends", getTrends);
dataRouter.get("/comparision", getComparision);
dataRouter.get("/growth", getGrowth);
dataRouter.get("/forecast", getForecast);

export default dataRouter;
