import { Router } from "express";
import { getAISummary, handleAIQuery } from "../controllers/aiController.js";

const aiRouter = Router();
aiRouter.post("/query", handleAIQuery);
aiRouter.get("/summary", getAISummary);

export default aiRouter;
