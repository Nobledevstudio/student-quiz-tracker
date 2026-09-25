import { useMutation } from "@tanstack/react-query";

import { submitQuiz } from "../api/quiz.api";

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({id ,answers}: {
      id: string;
      answers: {
        questionId: string;
        answer: string;
      }[];
    }) => submitQuiz(id, answers),
  });
};
