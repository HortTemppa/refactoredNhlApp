import express from "express";
import NHLRouter from "./routers/nhl";
import { apiErrorHandler } from "./errorHandlers/APIErrors";
import { nextTick } from "process";
const nhlApp = express();

const PORT = process.env.PORT || 3001;

nhlApp.use("/api/nhl/", NHLRouter);
nhlApp.use(apiErrorHandler);

nhlApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
