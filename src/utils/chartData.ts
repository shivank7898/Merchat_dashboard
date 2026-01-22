import type { Merchant } from "../configs";

export interface ChartDataPoint {
    month: string;
    value: number;
    formattedValue: string;
}

export type ChartType = "volume" | "successRate" | "merchants";

export function getVolumeChartData(merchants: Merchant[]): ChartDataPoint[] {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    return months.map((month) => {
        const totalVolume = merchants.reduce((sum, merchant) => {
            const monthData = merchant.monthlyData.find((m) => m.month === month);
            return sum + (monthData?.volume || 0);
        }, 0);

        return {
            month,
            value: totalVolume,
            formattedValue: new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(totalVolume),
        };
    });
}

export function getSuccessRateChartData(merchants: Merchant[]): ChartDataPoint[] {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    return months.map((month) => {
        const rates: number[] = [];
        merchants.forEach((merchant) => {
            const monthData = merchant.monthlyData.find((m) => m.month === month);
            if (monthData) {
                rates.push(monthData.successRate);
            }
        });

        const avgRate = rates.length > 0
            ? rates.reduce((sum, rate) => sum + rate, 0) / rates.length
            : 0;

        return {
            month,
            value: Math.round(avgRate * 10) / 10,
            formattedValue: `${Math.round(avgRate * 10) / 10}%`,
        };
    });
}

export function getActiveMerchantsChartData(merchants: Merchant[]): ChartDataPoint[] {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    return months.map((month) => {
        const activeCount = merchants.filter((merchant) => {
            if (merchant.status !== "active") return false;
            const monthData = merchant.monthlyData.find((m) => m.month === month);
            return monthData && monthData.transactions > 0;
        }).length;

        return {
            month,
            value: activeCount,
            formattedValue: activeCount.toString(),
        };
    });
}

export function getChartData(type: ChartType, merchants: Merchant[]): ChartDataPoint[] {
    switch (type) {
        case "volume":
            return getVolumeChartData(merchants);
        case "successRate":
            return getSuccessRateChartData(merchants);
        case "merchants":
            return getActiveMerchantsChartData(merchants);
        default:
            return getVolumeChartData(merchants);
    }
}

export function getChartTitle(type: ChartType): string {
    switch (type) {
        case "volume":
            return "Total Volume";
        case "successRate":
            return "Average Success Rate";
        case "merchants":
            return "Active Merchants";
        default:
            return "Total Volume";
    }
}

