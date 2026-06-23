// Mock data for the dashboard. Swap with real API calls.

export type Kpi = {
  label: string;
  value: number;
  deltaPct: number;
  currency?: boolean;
  suffix?: string;
  icon: "balance" | "revenue" | "mrr" | "churn";
  spark: number[];
};

export const kpis: Kpi[] = [
  { label: "Total Balance", value: 2847500, deltaPct: 12.4, currency: true, icon: "balance", spark: [38, 41, 39, 45, 44, 52, 58, 63] },
  { label: "Revenue (MTD)", value: 482300, deltaPct: 8.1, currency: true, icon: "revenue", spark: [22, 28, 26, 33, 31, 40, 44, 49] },
  { label: "MRR", value: 96400, deltaPct: 4.6, currency: true, icon: "mrr", spark: [60, 62, 63, 66, 68, 71, 74, 78] },
  { label: "Churn Rate", value: 1.8, deltaPct: -0.3, currency: false, suffix: "%", icon: "churn", spark: [30, 28, 31, 26, 24, 22, 21, 18] },
];

export const revenueSeries = [
  { month: "Jan", revenue: 312000, expenses: 210000 },
  { month: "Feb", revenue: 348000, expenses: 224000 },
  { month: "Mar", revenue: 331000, expenses: 218000 },
  { month: "Apr", revenue: 402000, expenses: 251000 },
  { month: "May", revenue: 437000, expenses: 263000 },
  { month: "Jun", revenue: 482300, expenses: 271000 },
];

export const allocation = [
  { name: "Equities", value: 42 },
  { name: "Fixed Income", value: 28 },
  { name: "Cash", value: 16 },
  { name: "Crypto", value: 14 },
];

export const targets = [
  { label: "New Accounts", current: 820, target: 1000, unit: "" },
  { label: "Payment Volume", current: 1340000, target: 1500000, unit: "$" },
  { label: "Support SLA", current: 94, target: 98, unit: "%" },
];

export type Transaction = {
  id: string;
  date: string;
  merchant: string;
  category: string;
  status: "completed" | "pending" | "failed";
  amount: number;
};

export const transactions: Transaction[] = [
  { id: "TX-10241", date: "2026-06-07", merchant: "Stripe Payout", category: "Income", status: "completed", amount: 18420 },
  { id: "TX-10240", date: "2026-06-07", merchant: "AWS", category: "Infrastructure", status: "completed", amount: -3211 },
  { id: "TX-10239", date: "2026-06-06", merchant: "Acme Corp", category: "Invoice", status: "pending", amount: 9500 },
  { id: "TX-10238", date: "2026-06-06", merchant: "Figma", category: "Software", status: "completed", amount: -144 },
  { id: "TX-10237", date: "2026-06-05", merchant: "Wire Transfer", category: "Transfer", status: "failed", amount: -52000 },
  { id: "TX-10236", date: "2026-06-05", merchant: "Globex LLC", category: "Invoice", status: "completed", amount: 27300 },
  { id: "TX-10235", date: "2026-06-04", merchant: "Payroll", category: "Salaries", status: "completed", amount: -86400 },
  { id: "TX-10234", date: "2026-06-04", merchant: "Initech", category: "Invoice", status: "pending", amount: 14250 },
];
