import { useQuery } from "@tanstack/react-query";
import { getQuizResults } from "../api/quiz.api";
export const useQuizResults = (id: string) => {
  return useQuery({
    queryKey: ["quiz-results", id],
    queryFn: () => getQuizResults(id),
    enabled: Boolean(id),
  });
};

