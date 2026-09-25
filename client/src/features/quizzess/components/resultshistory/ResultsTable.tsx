import ResultHistoryItem from "./ResultHistoryItem";
import type { QuizResult } from "../../types/quiz.types";

interface ResultsTableProps {
  results: QuizResult[];
}

const ResultsTable = ({ results }: ResultsTableProps) => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/40">
              <tr className="text-left">
                <th className="px-6 py-4 font-medium text-muted-foreground">
                  Attempt
                </th>

                <th className="px-6 py-4 font-medium text-muted-foreground">
                  Date
                </th>

                <th className="px-6 py-4 font-medium text-muted-foreground">
                  Score
                </th>

                <th className="px-6 py-4 text-right font-medium text-muted-foreground">
                  Percentage
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {results.map((result, index) => (
                <ResultHistoryItem
                  key={result.id}
                  result={result}
                  attemptNumber={results.length - index}
                  variant="table"
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {results.map((result, index) => (
          <ResultHistoryItem
            key={result.id}
            result={result}
            attemptNumber={results.length - index}
            variant="card"
          />
        ))}
      </div>
    </>
  );
};

export default ResultsTable;
