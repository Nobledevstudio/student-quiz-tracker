import { CheckCircle2, Target } from "lucide-react";

interface ResultSummaryProps {
  score: number;
  total: number;
  percentage: number;
}

const ResultSummary = ({
  score,
  total,
  percentage,
}: ResultSummaryProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>

        <p className="mt-5 text-sm font-medium text-primary">
          Quiz Complete
        </p>

        <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {percentage}%
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          You answered {score} out of {total} questions correctly.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-muted p-4 text-center">
          <Target className="mx-auto h-5 w-5 text-primary" />

          <p className="mt-2 text-xs font-medium text-muted-foreground">
            Score
          </p>

          <p className="mt-1 text-xl font-bold text-foreground">
            {score} / {total}
          </p>
        </div>

        <div className="rounded-xl bg-muted p-4 text-center">
          <CheckCircle2 className="mx-auto h-5 w-5 text-green-600" />

          <p className="mt-2 text-xs font-medium text-muted-foreground">
            Completed
          </p>

          <p className="mt-1 text-xl font-bold text-foreground">
            {total} / {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;