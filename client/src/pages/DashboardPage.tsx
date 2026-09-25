import {
  ClipboardList,
  FileQuestion,
  Target,
  TrendingUp,
} from "lucide-react";
import { useDashboardStats } from "../features/dashboard/components/useDashboardStats";


const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">
          Failed to load dashboard statistics.
        </p>
      </div>
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
      <div>
        <p className="text-sm font-medium text-sky-600">
          QuizTrack
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Good morning 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Create, practice and track your quiz progress.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-xl bg-sky-50 p-3">
                  <Icon className="h-5 w-5 text-sky-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Attempts this month
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Compared with the previous month
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">
              {data?.totalAttempts ?? 0}
            </p>

            <p className="text-sm text-slate-500">
              {data?.attemptsChangePercent ?? 0}% change
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;