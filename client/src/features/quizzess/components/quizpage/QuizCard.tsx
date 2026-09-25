import {
  ClipboardList,
  FileQuestion,
  Play,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import type { Quiz } from "../../types/quiz.types";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-xl border border-border 
    bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <h2 className="line-clamp-2 text-lg font-semibold text-foreground">
          {quiz.title}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Created{" "}
          {new Date(quiz.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <FileQuestion className="h-4 w-4 text-primary" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Questions
            </p>

            <p className="text-sm font-semibold text-foreground">
              {quiz._count.questions}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10">
            <ClipboardList className="h-4 w-4 text-secondary" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Attempts
            </p>

            <p className="text-sm font-semibold text-foreground">
              {quiz._count.results}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Button
          onClick={() => navigate(`/quizzes/${quiz.id}`)}
          className="cursor-pointer"
        >
          <Play className="mr-2 h-4 w-4" />
          Take Quiz
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            navigate(`/quizzes/${quiz.id}/results`)
          }
          className="cursor-pointer"
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          View Results
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;