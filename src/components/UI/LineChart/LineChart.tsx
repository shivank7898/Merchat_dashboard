import {
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts";
import Card from "../Card/Card";
import { ChevronDown } from "lucide-react";
import type { ChartDataPoint } from "../../../utils/chartData";
import styles from "./LineChart.module.css";

interface LineChartProps {
  title: string;
  data: ChartDataPoint[];
  color?: string;
  yAxisDomain?: [number, number];
  showGradient?: boolean;
}

export default function LineChart({
  title,
  data,
  color = "#077cfe",
  yAxisDomain,
  showGradient = true,
}: LineChartProps) {
  const gradientId = `gradient-${title.replace(/\s+/g, "-")}`;
  const finalGradientColor = color;

  // Calculate Y-axis domain if not provided
  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = (maxValue - minValue) * 0.1;
  const finalDomain: [number, number] = yAxisDomain || [
    Math.max(0, minValue - padding),
    maxValue + padding,
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataPoint;
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipValue}>{data.formattedValue}</p>
          <p className={styles.tooltipDate}>{data.month}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.timeframeBtn}>
            Last 6 Months
            <ChevronDown size={16} />
          </button>
        </div>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={finalGradientColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={finalGradientColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                stroke="var(--textMuted)"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                domain={finalDomain}
                stroke="var(--textMuted)"
                style={{ fontSize: "12px" }}
              />
              <Tooltip content={<CustomTooltip />} />
              {showGradient && (
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  fill={`url(#${gradientId})`}
                />
              )}
              {!showGradient && (
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  dot={{ fill: color, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}

