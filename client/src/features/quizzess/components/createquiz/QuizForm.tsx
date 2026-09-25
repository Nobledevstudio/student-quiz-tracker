import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import QuestionForm from "./QuestionForm";

import { useCreateQuiz } from "../../hook/useCreateQuiz";
import type {
    CreateQuizInput,
    CreateQuizQuestion,
} from "../../types/quiz.types";

const createEmptyQuestion = (): CreateQuizQuestion => ({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
});

const QuizForm = () => {
    const navigate = useNavigate();
    const createQuizMutation = useCreateQuiz();

    const [title, setTitle] = useState("");

    const [questions, setQuestions] = useState<CreateQuizQuestion[]>([createEmptyQuestion()]);

    const handleQuestionChange = (index: number,updatedQuestion: CreateQuizQuestion) => {
        setQuestions((previous) =>
            previous.map((question, questionIndex) =>
                questionIndex === index
                    ? updatedQuestion
                    : question
            )
        );
    };

    const handleAddQuestion = () => {
        setQuestions((previous) => [
            ...previous,
            createEmptyQuestion(),
        ]);
    };

    const handleRemoveQuestion = (index: number) => {
        setQuestions((previous) =>
            previous.filter(
                (_, questionIndex) => questionIndex !== index
            )
        );
    };

    const validateForm = () => {
        if (!title.trim()) {
            toast.error("Quiz title is required");
            return false;
        }

        for (let index = 0; index < questions.length; index++) {
            const question = questions[index];

            if (!question.text.trim()) {
                toast.error(
                    `Question ${index + 1} cannot be empty`
                );
                return false;
            }

            if (
                question.options.some(
                    (option) => !option.trim()
                )
            ) {
                toast.error(
                    `All options for question ${index + 1} are required`
                );
                return false;
            }

            if (!question.correctAnswer.trim()) {
                toast.error(
                    `Select a correct answer for question ${index + 1}`
                );
                return false;
            }
        }

        return true;
    };

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>)=> {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const payload: CreateQuizInput = {
            title: title.trim(),
            questions: questions.map((question) => ({
                text: question.text.trim(),
                options: question.options.map((option) =>
                    option.trim()
                ),
                correctAnswer: question.correctAnswer.trim(),
            })),
        };

        createQuizMutation.mutate(payload, {
            onSuccess: () => {
                toast.success("Quiz created successfully");
                navigate("/quizzes");
            },

            onError: () => {
                toast.error(
                    "Unable to create quiz. Please try again."
                );
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl space-y-8"
        >
            {/* Quiz title */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="space-y-2">
                    <label
                        htmlFor="quiz-title"
                        className="text-sm font-medium text-foreground"
                    >
                        Quiz title
                    </label>

                    <input
                        id="quiz-title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="e.g. JavaScript Fundamentals"
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-5">
                {questions.map((question, index) => (
                    <QuestionForm
                        key={index}
                        question={question}
                        questionNumber={index + 1}
                        canRemove={questions.length > 1}
                        onChange={(updatedQuestion) =>
                            handleQuestionChange(
                                index,
                                updatedQuestion
                            )
                        }
                        onRemove={() =>
                            handleRemoveQuestion(index)
                        }
                    />
                ))}
            </div>

            {/* Add question */}
            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleAddQuestion}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add question
            </Button>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/quizzes")}
                    disabled={createQuizMutation.isPending}
                >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={createQuizMutation.isPending}
                >
                    <Save className="mr-2 h-4 w-4" />

                    {createQuizMutation.isPending
                        ? "Creating..."
                        : "Create quiz"}
                </Button>
            </div>
        </form>
    );
};

export default QuizForm;
