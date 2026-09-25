import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const notFoundMiddleware = (req: Request,_res: Response,next: NextFunction) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};