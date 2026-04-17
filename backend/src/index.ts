// src/index.ts
import express from "express";
import dashboardRouter from "./routes/dashboardRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use("/api/v1", dashboardRouter);

// Error-handling middleware (last)
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
