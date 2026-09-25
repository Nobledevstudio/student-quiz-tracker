import {
  ClipboardList,
  FileQuestion,
  Target,
  TrendingUp,
} from "lucide-react";

import DashboardStatCard from "../features/dashboard/components/DashboardStatCard";
import { useDashboardStats } from "@/features/dashboard/hook/useDashboardStats";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";


const DashboardPage = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useDashboardStats();

  if (isLoading) {
    return (
      <LoadingState
        title="Loading dashboard"
        description="Fetching your latest quiz statistics..."
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load dashboard"
        description="We couldn't fetch your dashboard statistics. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const stats = [
    {
      label: "Total Quizzes",
      value: data?.totalQuizzes ?? 0,
      icon: FileQuestion,
    },
    {
      label: "Total Attempts",
      value: data?.totalAttempts ?? 0,
      icon: ClipboardList,
    },
    {
      label: "Average Score",
      value: `${data?.averageScore ?? 0}%`,
      icon: Target,
    },
    {
      label: "Added This Month",
      value: data?.quizzesAddedThisMonth ?? 0,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Page heading */}
      <div>
        <p className="text-sm font-medium text-primary">
          QuizTrack
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
          Good morning 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Create, practice and track your quiz progress.
        </p>
      </div>

      {/* Dashboard statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <DashboardStatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Attempts overview */}
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Attempts this month
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {data?.totalAttempts ?? 0}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Compared with the previous month
            </p>
          </div>

          <div className="rounded-lg bg-primary/10 px-2.5 py-1">
            <span className="text-xs font-semibold text-primary">
              {data?.attemptsChangePercent ?? 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;