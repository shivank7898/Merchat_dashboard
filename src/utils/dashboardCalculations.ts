import type { Merchant } from "../configs";

export interface DashboardStats {
    totalVolume: number;
    avgSuccessRate: number;
    activeMerchantsCount: number;
    totalTransactions: number;
}

export function calculateDashboardStats(merchants: Merchant[]): DashboardStats {
    const activeMerchants = merchants.filter((m) => m.status === "active");

    const totalVolume = merchants.reduce((sum, merchant) => sum + merchant.volume, 0);

    const avgSuccessRate =
        merchants.length > 0
            ? merchants.reduce((sum, merchant) => sum + merchant.successRate, 0) /
            merchants.length
            : 0;

    const activeMerchantsCount = activeMerchants.length;

    const totalTransactions = merchants.reduce(
        (sum, merchant) => sum + merchant.transactions,
        0
    );

    return {
        totalVolume,
        avgSuccessRate: Math.round(avgSuccessRate * 10) / 10,
        activeMerchantsCount,
        totalTransactions,
    };
}
