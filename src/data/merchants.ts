export interface MonthlyData {
  month: string;
  volume: number;
  successRate: number;
  transactions: number;
}

export interface Merchant {
  id: string;
  name: string;
  volume: number;
  successRate: number;
  status: "active" | "inactive";
  transactions: number;
  lastActivity: string;
  monthlyData: MonthlyData[];
}

const generateMonthlyData = (
  baseVolume: number,
  baseSuccessRate: number,
  baseTransactions: number
): MonthlyData[] => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month) => {
    const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
    const volumeVariation = (Math.random() - 0.5) * 0.2; // ±10% variation
    const transactionVariation = (Math.random() - 0.5) * 0.15; // ±7.5% variation
    
    return {
      month,
      volume: Math.round(baseVolume * (1 + volumeVariation)),
      successRate: Math.round((baseSuccessRate * (1 + variation)) * 10) / 10,
      transactions: Math.round(baseTransactions * (1 + transactionVariation)),
    };
  });
};

export const merchants: Merchant[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    volume: 125000,
    successRate: 96.5,
    status: "active",
    transactions: 1245,
    lastActivity: "2024-01-15",
    monthlyData: generateMonthlyData(125000, 96.5, 1245),
  },
  {
    id: "2",
    name: "RetailMax Inc",
    volume: 89000,
    successRate: 94.2,
    status: "active",
    transactions: 892,
    lastActivity: "2024-01-14",
    monthlyData: generateMonthlyData(89000, 94.2, 892),
  },
  {
    id: "3",
    name: "GlobalTrade Ltd",
    volume: 156000,
    successRate: 97.8,
    status: "active",
    transactions: 1567,
    lastActivity: "2024-01-15",
    monthlyData: generateMonthlyData(156000, 97.8, 1567),
  },
  {
    id: "4",
    name: "DigitalStore Co",
    volume: 67000,
    successRate: 92.1,
    status: "active",
    transactions: 678,
    lastActivity: "2024-01-13",
    monthlyData: generateMonthlyData(67000, 92.1, 678),
  },
  {
    id: "5",
    name: "Ecommerce Pro",
    volume: 234000,
    successRate: 95.6,
    status: "active",
    transactions: 2345,
    lastActivity: "2024-01-15",
    monthlyData: generateMonthlyData(234000, 95.6, 2345),
  },
  {
    id: "6",
    name: "MarketPlace Hub",
    volume: 189000,
    successRate: 93.4,
    status: "active",
    transactions: 1890,
    lastActivity: "2024-01-14",
    monthlyData: generateMonthlyData(189000, 93.4, 1890),
  },
  {
    id: "7",
    name: "ShopOnline Now",
    volume: 112000,
    successRate: 91.8,
    status: "active",
    transactions: 1123,
    lastActivity: "2024-01-12",
    monthlyData: generateMonthlyData(112000, 91.8, 1123),
  },
  {
    id: "8",
    name: "TradeConnect",
    volume: 145000,
    successRate: 96.9,
    status: "active",
    transactions: 1456,
    lastActivity: "2024-01-15",
    monthlyData: generateMonthlyData(145000, 96.9, 1456),
  },
  {
    id: "9",
    name: "Inactive Merchant",
    volume: 45000,
    successRate: 88.5,
    status: "inactive",
    transactions: 450,
    lastActivity: "2024-01-05",
    monthlyData: generateMonthlyData(45000, 88.5, 450),
  },
  {
    id: "10",
    name: "QuickBuy Store",
    volume: 98000,
    successRate: 94.7,
    status: "active",
    transactions: 987,
    lastActivity: "2024-01-15",
    monthlyData: generateMonthlyData(98000, 94.7, 987),
  },
];

