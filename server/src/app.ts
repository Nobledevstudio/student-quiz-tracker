import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import quizzRouter from "./modules/quizzes/quiz.route";
import dashboardRouter from "./modules/dashboard/dashboard.route";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://student-quiz-tracker.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/quizzes", quizzRouter);
app.use("/api/dashboard", dashboardRouter);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "QuizTrack API is running",
  });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
