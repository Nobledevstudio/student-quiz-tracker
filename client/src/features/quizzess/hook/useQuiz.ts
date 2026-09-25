import { useQuery } from "@tanstack/react-query";

import { getQuizById } from "../api/quiz.api";

export const useQuiz = (id: string) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => getQuizById(id),
    enabled: Boolean(id),
  });
};