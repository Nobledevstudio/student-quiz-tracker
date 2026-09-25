import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface ResultActionsProps {
  quizId: string;
}

const ResultActions = ({ quizId }: ResultActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Button
        variant="outline"
        onClick={() => navigate("/quizzes")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Quizzes
      </Button>

      <Button
        onClick={() => navigate(`/quizzes/${quizId}`)}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Take Quiz Again
      </Button>
    </div>
  );
};

export default ResultActions;
