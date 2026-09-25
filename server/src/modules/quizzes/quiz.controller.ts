import { Request, Response } from "express";
import {
  createQuiz,
  getQuizById,
  getQuizResults,
  getQuizzes,
  submitQuiz,
} from "./quiz.service";
import { createQuizSchema, submitQuizSchema } from "./quiz.validator";

export const createQuizController = async (req: Request, res: Response) => {
  const validatedData = createQuizSchema.parse(req.body);

  const quiz = await createQuiz(validatedData);

  res.status(201).json({
    success: true,
    message: "Quiz created successfully",
    data: quiz,
  });
};

export const getQuizzesController = async (_req: Request, res: Response) => {
  const quizzes = await getQuizzes();

  res.status(200).json({
    success: true,
    data: quizzes,
  });
};

export const getQuizByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const quiz = await getQuizById(req.params.id);

  res.status(200).json({
    success: true,
    data: quiz,
  });
};

export const submitQuizController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const validatedData = submitQuizSchema.parse(req.body);

  const result = await submitQuiz(req.params.id, validatedData);

  res.status(200).json({
    success: true,
    message: "Quiz submitted successfully",
    data: result,
  });
};

export const getQuizResultsController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const results = await getQuizResults(req.params.id);

  res.status(200).json({
    success: true,
    data: results,
  });
};
