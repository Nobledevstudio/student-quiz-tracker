import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";

import QuestionCard from "@/features/quizzess/components/takequiz/QuestionCard";
import QuizHeader from "@/features/quizzess/components/takequiz/QuizHeader";
import QuizNavigation from "@/features/quizzess/components/takequiz/QuizNavigation";

import { useQuiz } from "@/features/quizzess/hook/useQuiz";
import { useSubmitQuiz } from "@/features/quizzess/hook/useSubmitQuiz";
import { toast } from "sonner";

const TakeQuizPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        data: quiz,
        isLoading,
        isError,
        refetch,
    } = useQuiz(id ?? "");

    const submitQuizMutation = useSubmitQuiz();

    const [currentQuestionIndex, setCurrentQuestionIndex] =
        useState(0);

    const [selectedAnswers, setSelectedAnswers] = useState<
        Record<string, string>
    >({});

    if (isLoading) {
        return (
            <LoadingState
                title="Loading quiz"
                description="Getting the questions ready..."
            />
        );
    }

    if (isError || !quiz) {
        return (
            <ErrorState
                title="Unable to load quiz"
                description="We couldn't load this quiz. Please try again."
                onRetry={() => refetch()}
            />
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;

    const isLastQuestion =
        currentQuestionIndex === totalQuestions - 1;

    const selectedAnswer =
        selectedAnswers[currentQuestion.id] ?? "";

    const handleAnswerChange = (answer: string) => {
        setSelectedAnswers((previous) => ({
            ...previous,
            [currentQuestion.id]: answer,
        }));
    };

    const handleSubmit = () => {
        const answers = Object.entries(selectedAnswers).map(
            ([questionId, answer]) => ({
                questionId,
                answer,
            })
        );

        submitQuizMutation.mutate(
            {
                id: quiz.id,
                answers,
            },
            {
                onSuccess: (result) => {
                    toast.success("Quiz submitted successfully");

                    navigate(`/quizzes/${quiz.id}/result`, {
                        state: {
                            result,
                            quizTitle: quiz.title,
                        },
                    });
                },

                onError: () => {
                    toast.error("Failed to submit quiz. Please try again.");
                },
            }
        );
    };

    const handleNext = () => {
        if (isLastQuestion) {
            handleSubmit();
            return;
        }

        setCurrentQuestionIndex((previous) => previous + 1);
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((previous) =>
            Math.max(previous - 1, 0)
        );
    };

    return (
        <div className="space-y-8 p-6">
            <QuizHeader
                title={quiz.title}
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
            />

            <div className="mx-auto w-full max-w-3xl space-y-6">
                <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    onAnswerChange={handleAnswerChange}
                />

                <QuizNavigation
                    currentQuestion={currentQuestionIndex}
                    totalQuestions={totalQuestions}
                    isLastQuestion={isLastQuestion}
                    hasSelectedAnswer={Boolean(selectedAnswer)}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                />
            </div>
        </div>
    );
};

export default TakeQuizPage;
