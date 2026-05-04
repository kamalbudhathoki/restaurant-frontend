import api from "@/lib/axios";
import { AnalyticsSummary, DailyRevenue } from "@/types";

export const fetchAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const response = await api.get<AnalyticsSummary>("/analytics");
  return response.data;
};

export const fetchDailyRevenue = async (): Promise<DailyRevenue[]> => {
  const response = await api.get<DailyRevenue[]>("/analytics/daily");
  return response.data;
};