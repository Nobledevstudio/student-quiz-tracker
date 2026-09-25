export interface DashboardStats {
  totalQuizzes: number;
  totalAttempts: number;
  averageScore: number;
  quizzesAddedThisMonth: number;
  attemptsChangePercent: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStats;
}
