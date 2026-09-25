import { RequestHandler } from "express";

export const asyncHandler = (fn: RequestHandler<any, any, any, any>): RequestHandler<any, any, any, any> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};