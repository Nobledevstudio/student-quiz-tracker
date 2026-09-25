import { Router } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { getDashboardStatsController } from "./dashboard.controller";

const dashboardRouter = Router();

dashboardRouter.get("/stats", asyncHandler(getDashboardStatsController));

export default dashboardRouter;
