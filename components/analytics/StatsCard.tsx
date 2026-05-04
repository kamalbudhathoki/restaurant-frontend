interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "blue" | "green" | "orange" | "purple";
}

const colorMap = {
  blue:   "bg-blue-50 border-blue-200 text-blue-700",
  green:  "bg-green-50 border-green-200 text-green-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
  purple: "bg-purple-50 border-purple-200 text-purple-700",
};

export default function StatsCard({
  title,
  value,
  subtitle,
  color = "blue",
}: StatsCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${colorMap[color]}`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      {subtitle && (
        <p className="text-xs mt-1 opacity-60">{subtitle}</p>
      )}
    </div>
  );
}