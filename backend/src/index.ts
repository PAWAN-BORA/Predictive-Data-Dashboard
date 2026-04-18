// src/index.ts
import "dotenv/config"; 
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import aiRouter from "./routes/AIRoutes.js";
import cors from "cors";
import { aiLimiter, apiLimiter } from "./middleware/rateLimiter.js";
import dataRouter from "./routes/dataRouter.js";
const app = express();

app.use(cors())
app.use(express.json());
app.use("/api/v1", apiLimiter, dataRouter);
app.use("/api/v1/ai", aiLimiter, aiRouter);

// Error-handling middleware (last)
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
