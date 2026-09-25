import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateQuizHeader = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate("/quizzes")}
        className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to quizzes
      </button>

      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Create quiz
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Add four answer options and select the correct one.
        </p>
      </div>
    </div>
  );
};

export default CreateQuizHeader;