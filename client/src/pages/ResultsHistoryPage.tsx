import { useParams } from "react-router-dom";
import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import ResultsHistoryHeader from "@/features/quizzess/components/resultshistory/ResultsHistoryHeader";
import ResultsHistoryList from "@/features/quizzess/components/resultshistory/ResultsHistoryList";
import ResultsOverview from "@/features/quizzess/components/resultshistory/ResultsOverview";
import ResultHistoryCard from "@/features/quizzess/components/resultshistory/ResultHistoryCard";
import { useQuiz } from "@/features/quizzess/hook/useQuiz";
import { useQuizResults } from "@/features/quizzess/hook/useQuizResults";

const ResultsHistoryPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: quiz,
    isLoading: isQuizLoading,
    isError: isQuizError,
  } = useQuiz(id ?? "");

  const {
    data: results,
    isLoading: isResultsLoading,
    isError: isResultsError,
  } = useQuizResults(id ?? "");

  if (isQuizLoading || isResultsLoading) {
    return <LoadingState />;
  }

  if (
    isQuizError ||
    isResultsError ||
    !quiz ||
    !results
  ) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-8 p-6">
      <ResultsHistoryHeader />

      <ResultsOverview
        title={quiz.title}
        questionCount={quiz.questions.length}
        attemptCount={results.length}
      />

      {/* Desktop */}
      <div className="hidden md:block">
        <ResultsHistoryList results={results} />
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {results.map((result, index) => (
          <ResultHistoryCard
            key={result.id}
            result={result}
            attemptNumber={results.length - index}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsHistoryPage;
