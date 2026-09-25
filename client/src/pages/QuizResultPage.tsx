import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ErrorState from "@/components/common/ErrorState";
import ResultActions from "@/features/quizzess/components/result/ResultActions";
import ResultSummary from "@/features/quizzess/components/result/ResultSummary";

interface QuizResultState {
  result: {
    score: number;
    total: number;
    percentage: number;
    submittedAt: string;
  };
  quizTitle: string;
}

const QuizResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as QuizResultState | null;

  if (!state?.result || !state?.quizTitle || !id) {
    return (
      <ErrorState
        title="Result not available"
        description="We couldn't find the quiz result. Please take the quiz again."
        onRetry={() => navigate("/quizzes")}
      />
    );
  }

  const { result, quizTitle } = state;

  return (
    <div className="space-y-8 p-6">
      <div>
        <button
          type="button"
          onClick={() => navigate("/quizzes")}
          className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-primary">
            Quiz Result
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {quizTitle}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Here's how you performed on this quiz.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl space-y-6">
        <ResultSummary
          score={result.score}
          total={result.total}
          percentage={result.percentage}
        />

        <ResultActions quizId={id} />
      </div>
    </div>
  );
};

export default QuizResultPage;

