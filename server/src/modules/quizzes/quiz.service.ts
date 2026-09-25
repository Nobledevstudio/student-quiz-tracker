import prisma from "../../config/prisma";
import { AppError } from "../../utils/app-error";
import { CreateQuizInput, SubmitQuizInput } from "./quiz.validator";

export const createQuiz = async (data: CreateQuizInput) => {
  const quiz = await prisma.quiz.create({
    data: {
      title: data.title,
      questions: {
        create: data.questions.map((question) => ({
          text: question.text,
          options: question.options,
          correctAnswer: question.correctAnswer,
        })),
      },
    },
    include: {
      questions: true,
    },
  });

  return quiz;
};

export const getQuizzes = async () => {
  return prisma.quiz.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          questions: true,
          results: true,
        },
      },
    },
  });
};

export const getQuizById = async (id: string) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        select: {
          id: true,
          text: true,
          options: true,
        },
      },
    },
  });

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  return quiz;
};
export const submitQuiz = async (quizId: string, data: SubmitQuizInput) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      questions: {
        select: {
          id: true,
          options: true,
          correctAnswer: true,
        },
      },
    },
  });

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  const questionMap = new Map(
    quiz.questions.map((question) => [
      question.id,
      {
        options: question.options,
        correctAnswer: question.correctAnswer,
      },
    ]),
  );

  const submittedQuestionIds = new Set<string>();

  for (const submittedAnswer of data.answers) {
    if (submittedQuestionIds.has(submittedAnswer.questionId)) {
      throw new AppError(
        `Duplicate answer for question ${submittedAnswer.questionId}`,
        400,
      );
    }

    submittedQuestionIds.add(submittedAnswer.questionId);

    const question = questionMap.get(submittedAnswer.questionId);

    if (!question) {
      throw new AppError(
        `Invalid question ID: ${submittedAnswer.questionId}`,
        400,
      );
    }

    const options = question.options as string[];

    if (!options.includes(submittedAnswer.answer)) {
      throw new AppError(
        `Invalid answer for question ${submittedAnswer.questionId}`,
        400,
      );
    }
  }

  if (data.answers.length !== quiz.questions.length) {
    throw new AppError(
      `All questions must be answered. Expected ${quiz.questions.length} answers, received ${data.answers.length}`,
      400,
    );
  }

  let score = 0;

  for (const submittedAnswer of data.answers) {
    const question = questionMap.get(submittedAnswer.questionId);

    if (question && question.correctAnswer === submittedAnswer.answer) {
      score++;
    }
  }

  const total = quiz.questions.length;

  const result = await prisma.quizResult.create({
    data: {
      quizId,
      score,
      total,
    },
  });

  return {
    score: result.score,
    total: result.total,
    percentage: Math.round((result.score / result.total) * 100),
    submittedAt: result.createdAt,
  };
};

export const getQuizResults = async (quizId: string) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    select: {
      id: true,
    },
  });

  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }

  const results = await prisma.quizResult.findMany({
    where: {
      quizId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return results.map((result) => ({
    id: result.id,
    score: result.score,
    total: result.total,
    percentage: Math.round((result.score / result.total) * 100),
    createdAt: result.createdAt,
  }));
};
