import { useQuery } from "@tanstack/react-query";
import { getQuizzes } from "../api/quiz.api";

export const useQuizzes = () => {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
  });
};