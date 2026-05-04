"use client";

import { useState, useEffect } from "react";
import { AnalyticsSummary, DailyRevenue } from "@/types";
import {
  fetchAnalyticsSummary,
  fetchDailyRevenue,
} from "@/services/analytics.service";

export function useAnalytics() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // Fetch both at the same time with Promise.all
        const [summaryData, dailyData] = await Promise.all([
          fetchAnalyticsSummary(),
          fetchDailyRevenue(),
        ]);
        setSummary(summaryData);
        setDailyRevenue(dailyData);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load analytics";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { summary, dailyRevenue, loading, error };
}