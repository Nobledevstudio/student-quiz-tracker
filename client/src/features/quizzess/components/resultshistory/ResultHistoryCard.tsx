import { CalendarDays } from "lucide-react";
import type { QuizResult } from "../../types/quiz.types";

interface ResultHistoryCardProps {
  result: QuizResult;
  attemptNumber: number;
}

const ResultHistoryCard = ({
  result,
  attemptNumber,
}: ResultHistoryCardProps) => {
  const formattedDate = new Date(
    result.createdAt
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-foreground">
            Attempt {attemptNumber}
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />

            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-foreground">
            {result.percentage}%
          </p>

          <p className="text-xs text-muted-foreground">
            {result.score} / {result.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultHistoryCard;
