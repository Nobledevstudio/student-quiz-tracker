import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  title?: string;
  description?: string;
}

const LoadingState = ({
  title = "Loading...",
  description = "Please wait while we get things ready.",
}: LoadingStateProps) => {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-foreground">
        {title}
      </h2>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default LoadingState;