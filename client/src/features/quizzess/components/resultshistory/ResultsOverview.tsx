
import { ClipboardList, FileQuestion } from "lucide-react";
interface ResultsOverviewProps {
  title: string;
  questionCount: number;
  attemptCount: number;
}

const ResultsOverview = ({
  title,
  questionCount,
  attemptCount,
}: ResultsOverviewProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          {title}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Quiz performance overview
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex min-w-[180px] flex-1 items-center gap-3 rounded-xl border border-border bg-background p-4 sm:max-w-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <FileQuestion className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Questions
            </p>

            <p className="text-lg font-semibold text-foreground">
              {questionCount}
            </p>
          </div>
        </div>

        <div className="flex min-w-[180px] flex-1 items-center gap-3 rounded-xl border border-border bg-background p-4 sm:max-w-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
            <ClipboardList className="h-5 w-5 text-secondary" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Attempts
            </p>

            <p className="text-lg font-semibold text-foreground">
              {attemptCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsOverview;

