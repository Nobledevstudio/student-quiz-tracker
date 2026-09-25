import prisma from "../../config/prisma";

export const getDashboardStats = async () => {
  const now = new Date();

  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const startOfPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1,
  );

  const startOfCurrentMonthAttempts = startOfCurrentMonth;

  const startOfPreviousMonthAttempts = startOfPreviousMonth;

  const endOfPreviousMonthAttempts = startOfCurrentMonth;

  const [
    totalQuizzes,
    totalAttempts,
    averageResult,
    quizzesAddedThisMonth,
    currentMonthAttempts,
    previousMonthAttempts,
  ] = await Promise.all([
    prisma.quiz.count(),

    prisma.quizResult.count(),

    prisma.quizResult.aggregate({
      _avg: {
        score: true,
      },
    }),

    prisma.quiz.count({
      where: {
        createdAt: {
          gte: startOfCurrentMonth,
        },
      },
    }),

    prisma.quizResult.count({
      where: {
        createdAt: {
          gte: startOfCurrentMonthAttempts,
        },
      },
    }),

    prisma.quizResult.count({
      where: {
        createdAt: {
          gte: startOfPreviousMonthAttempts,
          lt: endOfPreviousMonthAttempts,
        },
      },
    }),
  ]);

  const totalPossibleScore = await prisma.quizResult.aggregate({
    _sum: {
      total: true,
    },
  });

  const averageScore =
    totalPossibleScore._sum.total && totalPossibleScore._sum.total > 0
      ? Math.round(
          ((averageResult._avg.score ?? 0) / totalPossibleScore._sum.total) *
            100,
        )
      : 0;

  const attemptsChangePercent =
    previousMonthAttempts === 0
      ? currentMonthAttempts > 0
        ? 100
        : 0
      : Math.round(
          ((currentMonthAttempts - previousMonthAttempts) /
            previousMonthAttempts) *
            100,
        );

  return {
    totalQuizzes,
    totalAttempts,
    averageScore,
    quizzesAddedThisMonth,
    attemptsChangePercent,
  };
};
