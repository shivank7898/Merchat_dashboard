import { useMemo, useState } from "react";
import { DollarSign, TrendingUp, Users } from "lucide-react";
import StatCard from "../../components/UI/StatCard/StatCard";
import LineChart from "../../components/UI/LineChart/LineChart";
import { useMerchantStore } from "../../store/merchantStore";
import { calculateDashboardStats } from "../../utils/dashboardCalculations";
import { formatCurrency, formatNumber } from "../../utils/formatters";
import {
  getChartData,
  getChartTitle,
  type ChartType,
} from "../../utils/chartData";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const merchants = useMerchantStore((state) => state.merchants);
  const [selectedChart, setSelectedChart] = useState<ChartType>("volume");
  const stats = useMemo(() => calculateDashboardStats(merchants), [merchants]);
  const chartData = useMemo(
    () => getChartData(selectedChart, merchants),
    [selectedChart, merchants]
  );


  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Volume"
          value={formatCurrency(stats.totalVolume)}
          icon={<DollarSign size={20} />}
          trend={{ value: "+12.5%", isPositive: true }}
          onClick={() => setSelectedChart("volume")}
          isActive={selectedChart === "volume"}
        />
        <StatCard
          title="Avg Success Rate"
          value={`${stats.avgSuccessRate}%`}
          icon={<TrendingUp size={20} />}
          trend={{ value: "+2.1%", isPositive: true }}
          onClick={() => setSelectedChart("successRate")}
          isActive={selectedChart === "successRate"}
        />
        <StatCard
          title="Active Merchants"
          value={formatNumber(stats.activeMerchantsCount)}
          icon={<Users size={20} />}
          trend={{ value: "+8.3%", isPositive: true }}
          onClick={() => setSelectedChart("merchants")}
          isActive={selectedChart === "merchants"}
        />
      </div>
      <div className={styles.visualization}>
        <LineChart
          title={getChartTitle(selectedChart)}
          data={chartData}
          color={
            selectedChart === "volume"
              ? "#077cfe"
              : selectedChart === "successRate"
                ? "#10b981"
                : "#8b5cf6"
          }
          yAxisDomain={
            selectedChart === "successRate"
              ? [85, 100]
              : selectedChart === "merchants"
                ? [0, 12]
                : undefined
          }
        />
      </div>
    </div>
  );
}

