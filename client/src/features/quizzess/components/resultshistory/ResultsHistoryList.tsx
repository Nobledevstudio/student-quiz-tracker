

import type { QuizResult } from "../../types/quiz.types";
import ResultsTable from "./ResultsTable";

interface ResultsHistoryListProps {
  results: QuizResult[];
}

const ResultsHistoryList = ({
  results,
}: ResultsHistoryListProps) => {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Attempt History
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Review previous attempts and scores.
        </p>
      </div>

      <ResultsTable results={results} />
    </section>
  );
};

export default ResultsHistoryList;

