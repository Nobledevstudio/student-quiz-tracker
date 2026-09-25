
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface QuizHeaderProps {
    title: string;
    currentQuestion: number;
    totalQuestions: number;
}

const QuizHeader = ({ title, currentQuestion, totalQuestions }: QuizHeaderProps) => {
    const navigate = useNavigate();

    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <div className="space-y-6">
            <Button
                variant="ghost"
                className="h-10 px-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                onClick={() => navigate("/quizzes")}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quizzes
            </Button>

            <div className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {title}
                    </h1>

                    <span className="text-sm font-medium text-muted-foreground">
                        Question {currentQuestion} of {totalQuestions}
                    </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default QuizHeader
