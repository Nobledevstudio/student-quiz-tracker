import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CreateQuizQuestion } from "../../types/quiz.types";

interface QuestionFormProps {
    question: CreateQuizQuestion;
    questionNumber: number;
    canRemove: boolean;
    onChange: (question: CreateQuizQuestion) => void;
    onRemove: () => void;
}

const QuestionForm = ({
    question,
    questionNumber,
    canRemove,
    onChange,
    onRemove,
}: QuestionFormProps) => {
    const handleTextChange = (value: string) => {
        onChange({
            ...question,
            text: value,
        });
    };

    const handleOptionChange = (index: number,value: string) => {

        const updatedOptions = [...question.options];
        updatedOptions[index] = value;

        onChange({
            ...question,
            options: updatedOptions,
            correctAnswer: question.correctAnswer === question.options[index]
                    ? value
                    : question.correctAnswer,
        });
    };

    const handleCorrectAnswerChange = (
        value: string
    ) => {
        onChange({
            ...question,
            correctAnswer: value,
        });
    };

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-foreground">
                        Question {questionNumber}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Add the question and four answer options.
                    </p>
                </div>

                {canRemove && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onRemove}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Remove question ${questionNumber}`}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="mt-6 space-y-6">
                {/* Question */}
                <div className="space-y-2">
                    <label
                        htmlFor={`question-${questionNumber}`}
                        className="text-sm font-medium text-foreground"
                    >
                        Question
                    </label>

                    <textarea
                        id={`question-${questionNumber}`}
                        value={question.text}
                        onChange={(event) =>
                            handleTextChange(event.target.value)
                        }
                        placeholder="e.g. Which language is used to style web pages?"
                        rows={3}
                        className="flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>

                {/* Options */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-foreground">
                            Answer options
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Provide exactly four possible answers.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {question.options.map((option, index) => (
                            <div
                                key={`option-${index}`}
                                className="space-y-2"
                            >
                                <label
                                    htmlFor={`question-${questionNumber}-option-${index}`}
                                    className="text-sm font-medium text-foreground"
                                >
                                    Option {String.fromCharCode(65 + index)}
                                </label>

                                <input
                                    id={`question-${questionNumber}-option-${index}`}
                                    type="text"
                                    value={option}
                                    onChange={(event) =>
                                        handleOptionChange(
                                            index,
                                            event.target.value
                                        )
                                    }
                                    placeholder={`Option ${String.fromCharCode(
                                        65 + index
                                    )}`}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor={`correct-answer-${questionNumber}`}
                        className="text-sm font-medium text-foreground"
                    >
                        Correct answer
                    </label>

                    <select
                        id={`correct-answer-${questionNumber}`}
                        value={question.correctAnswer}
                        onChange={(event) =>
                            handleCorrectAnswerChange(event.target.value)
                        }
                        className="h-10 w-full max-w-55 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20">
                        <option value="">
                            Select the correct answer
                        </option>

                        {question.options.map((option, index) => (
                            <option
                                key={`correct-${index}`}
                                value={option}
                                disabled={!option.trim()}
                            >
                                Option {String.fromCharCode(65 + index)}
                                {option.trim() ? `— ${option}` : ""}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;
