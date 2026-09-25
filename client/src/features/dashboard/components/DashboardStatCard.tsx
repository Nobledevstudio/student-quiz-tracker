import type { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

const DashboardStatCard = ({
  label,
  value,
  icon: Icon,
}: DashboardStatCardProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-foreground">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;