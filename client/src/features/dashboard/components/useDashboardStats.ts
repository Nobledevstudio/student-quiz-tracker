import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/dashboard.api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
};
