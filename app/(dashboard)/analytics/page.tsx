"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import RevenueChart from "@/components/analytics/RevenueChart";
import StatsCard from "@/components/analytics/StatsCard";
import TopItemsTable from "@/components/analytics/TopItemsTable";

export default function AnalyticsPage() {
  const { summary, dailyRevenue, loading, error } = useAnalytics();

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Loading analytics...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (!summary) {
    return <p className="text-center text-gray-500 py-10">No analytics data available.</p>;
  }

  const totalOrdersByStatus = summary.ordersByStatus.reduce(
    (sum, status) => sum + status.count,
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Performance metrics for your restaurant.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`$${summary.totalRevenue.toFixed(2)}`}
          subtitle="Last 7 days"
          color="green"
        />
        <StatsCard
          title="Total Orders"
          value={summary.totalOrders}
          subtitle="Completed orders"
          color="blue"
        />
        <StatsCard
          title="Top Selling Item"
          value={summary.topSellingItems[0]?.itemName ?? "—"}
          subtitle="Best seller"
          color="purple"
        />
        <StatsCard
          title="Orders Tracked"
          value={totalOrdersByStatus}
          subtitle="All statuses"
          color="orange"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <RevenueChart data={dailyRevenue} />
        <TopItemsTable items={summary.topSellingItems} />
      </div>
    </div>
  );
}
