import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import quizzRouter from "./modules/quizzes/quiz.route";
import dashboardRouter from "./modules/dashboard/dashboard.route";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/quizzes", quizzRouter);
app.use("/api/dashboard", dashboardRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
