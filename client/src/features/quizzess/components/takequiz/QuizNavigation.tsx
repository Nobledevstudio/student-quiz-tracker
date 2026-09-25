import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  isLastQuestion: boolean;
  hasSelectedAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  isLastQuestion,
  hasSelectedAnswer,
  onPrevious,
  onNext,
}: QuizNavigationProps) => {
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <p className="hidden text-sm text-muted-foreground sm:block">
        {currentQuestion + 1} of {totalQuestions}
      </p>

      <Button
        onClick={onNext}
        disabled={!hasSelectedAnswer}
      >
        {isLastQuestion ? (
          <>
            Submit Quiz
            <Check className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Next Question
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default QuizNavigation;