import { z } from "zod";

export const createQuizSchema = z.object({
  title: z.string().trim().min(1, "Quiz title is required"),
  questions: z.array(
      z.object({
          text: z.string().trim().min(1, "Question text is required"),
          options: z.array(z.string().trim().min(1, "Option cannot be empty")).length(4, "Each question must have exactly 4 options"),
          correctAnswer: z.string().trim().min(1, "Correct answer is required")})
        .superRefine((question, ctx) => {
          if (!question.options.includes(question.correctAnswer)) {
            ctx.addIssue({
              code: "custom",
              path: ["correctAnswer"],
              message: "Correct answer must be one of the options",
            });
          }
        })
    )
    .min(1, "At least one question is required"),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;


export const submitQuizSchema = z.object({
  answers: z.array(
      z.object({
        questionId: z.string().min(1, "Question ID is required"),
        answer: z.string().min(1, "Answer is required"),
      })
    )
    .min(1, "At least one answer is required"),
});

export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;