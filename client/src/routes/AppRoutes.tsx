import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import CreateQuizPage from "@/pages/CreateQuizPage";
import DashboardPage from "@/pages/DashboardPage";
import QuizzesPage from "@/pages/QuizzesPage";
import QuizResultPage from "@/pages/QuizResultPage";
import ResultsHistoryPage from "@/pages/ResultsHistoryPage";
import TakeQuizPage from "@/pages/TakeQuizPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/quizzes"
          element={<QuizzesPage />}
        />

        <Route
          path="/quizzes/:id/results"
          element={<ResultsHistoryPage />}
        />

        <Route
          path="/quizzes/:id/result"
          element={<QuizResultPage />}
        />

        <Route
          path="/quizzes/:id"
          element={<TakeQuizPage />}
        />

        <Route
          path="/create-quiz"
          element={<CreateQuizPage />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

