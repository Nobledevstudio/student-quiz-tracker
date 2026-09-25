import type { QuizQuestion } from "../../types/quiz.types";

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
}

const QuestionCard = ({
  question,
  selectedAnswer,
  onAnswerChange,
}: QuestionCardProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-sm font-medium text-primary">
          Choose one answer
        </p>

        <h2 className="mt-3 text-xl font-semibold leading-relaxed text-foreground sm:text-2xl">
          {question.text}
        </h2>
      </div>

      <div className="mt-8 space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;

          return (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={isSelected}
                onChange={() => onAnswerChange(option)}
                className="h-4 w-4 accent-primary"
              />

              <span className="text-sm font-medium text-foreground sm:text-base">
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;