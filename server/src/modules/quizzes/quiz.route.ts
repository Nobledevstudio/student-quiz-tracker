import express from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import {
  createQuizController,
  getQuizByIdController,
  getQuizResultsController,
  getQuizzesController,
  submitQuizController,
} from "./quiz.controller";

const quizzRouter = express.Router();

quizzRouter.post("/", asyncHandler(createQuizController));
quizzRouter.get("/", asyncHandler(getQuizzesController));
quizzRouter.get("/:id", asyncHandler(getQuizByIdController));
quizzRouter.post("/:id/submit", asyncHandler(submitQuizController));
quizzRouter.get("/:id/results", asyncHandler(getQuizResultsController));

export default quizzRouter;
