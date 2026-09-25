import QuizCard from "./QuizCard";
import type { Quiz } from "../../types/quiz.types";

interface QuizListProps {
  quizzes: Quiz[];
}

const QuizList = ({ quizzes }: QuizListProps) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};

export default QuizList;
