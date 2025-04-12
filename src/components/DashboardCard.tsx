
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: "blue" | "purple" | "green" | "orange" | "red";
}

const DashboardCard = ({
  title,
  value,
  icon,
  description,
  trend,
  color
}: DashboardCardProps) => {
  const colorClasses = {
    blue: "border-campus-primary text-campus-primary",
    purple: "border-campus-secondary text-campus-secondary",
    green: "border-campus-success text-campus-success",
    orange: "border-campus-warning text-campus-warning",
    red: "border-campus-danger text-campus-danger"
  };

  return (
    <div className={`dashboard-card border-l-4 ${colorClasses[color]}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
          <div className="flex items-end mt-1">
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            {trend && (
              <span className={`ml-2 text-sm font-medium ${trend.isPositive ? 'text-campus-success' : 'text-campus-danger'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
        </div>
        <div className={`p-2 rounded-full bg-gray-100`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
