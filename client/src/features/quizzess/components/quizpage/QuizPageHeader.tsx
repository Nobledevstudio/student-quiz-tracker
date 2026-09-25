import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const QuizPageHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Quizzes
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Browse and take available quizzes.
        </p>
      </div>

      <Button onClick={() => navigate("/create-quiz")}>
        <Plus className="mr-2 h-4 w-4" />
        Create Quiz
      </Button>
    </div>
  );
};

export default QuizPageHeader;