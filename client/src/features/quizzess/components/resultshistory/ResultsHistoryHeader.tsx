import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResultsHistoryHeader = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate("/quizzes")}
        className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to quizzes
      </button>

      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Results History
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          View previous attempts and scores for this quiz.
        </p>
      </div>
    </div>
  );
};

export default ResultsHistoryHeader;

