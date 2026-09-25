import { useMutation } from "@tanstack/react-query";

import { createQuiz } from "../api/quiz.api";
import type { CreateQuizInput } from "../types/quiz.types";

export const useCreateQuiz = () => {
  return useMutation({
    mutationFn: (data: CreateQuizInput) => createQuiz(data),
  });
};