import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import QuizList from "@/features/quizzess/components/quizpage/QuizList";
import QuizPageHeader from "@/features/quizzess/components/quizpage/QuizPageHeader";
import { useQuizzes } from "@/features/quizzess/hook/useQuizzes";


const QuizzesPage = () => {
  const {
    data: quizzes,
    isLoading,
    isError,
    refetch,
  } = useQuizzes();

  if (isLoading) {
    return (
      <LoadingState
        title="Loading quizzes"
        description="Fetching available quizzes..."
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Unable to load quizzes"
        description="We couldn't fetch the available quizzes. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="space-y-8 p-6">
        <QuizPageHeader />

        <EmptyState
          title="No quizzes yet"
          description="Create your first quiz to start tracking student progress."
          actionLabel="Create Quiz"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <QuizPageHeader />

      <QuizList quizzes={quizzes} />
    </div>
  );
};

export default QuizzesPage;
