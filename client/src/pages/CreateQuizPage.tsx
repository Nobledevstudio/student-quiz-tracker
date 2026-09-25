import CreateQuizHeader from "@/features/quizzess/components/createquiz/CreateQuizHeader";
import QuizForm from "@/features/quizzess/components/createquiz/QuizForm";

const CreateQuizPage = () => {
  return (
    <div className="space-y-8 p-6">
      <CreateQuizHeader />
      <QuizForm />
    </div>
  );
};

export default CreateQuizPage;
