import { FileQuestion, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title = "No quizzes yet",
  description = "Create your first quiz to start tracking student progress.",
  actionLabel = "Create Quiz",
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-6 w-6 text-primary" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-foreground">
        {title}
      </h2>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>

      {onAction && (
        <Button className="mt-5" onClick={onAction}>
          <Plus className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;