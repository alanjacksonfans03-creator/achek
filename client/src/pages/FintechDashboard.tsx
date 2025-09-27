import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 54000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 65000 },
  { month: "May", revenue: 72000 },
  { month: "Jun", revenue: 81000 },
  { month: "Jul", revenue: 76000 },
  { month: "Aug", revenue: 90000 },
];

const paymentsByChannel = [
  { name: "Bank Transfer", value: 420 },
  { name: "Mobile Money (MTN, Airtel)", value: 580 },
  { name: "Card", value: 220 },
  { name: "POS", value: 140 },
];

const COLORS = ["#0ea5a4", "#2563eb", "#10b981", "#60a5fa"];

const transactions = [
  {
    id: "TXN-1001",
    date: "2025-09-10",
    merchant: "Adenike Grocery",
    channel: "Mobile Money",
    amount: 25000,
    status: "Success",
  },
  {
    id: "TXN-1002",
    date: "2025-09-11",
    merchant: "BlueTailor",
    channel: "Card",
    amount: 45000,
    status: "Failed",
  },
  {
    id: "TXN-1003",
    date: "2025-09-12",
    merchant: "Okada Rental",
    channel: "Bank Transfer",
    amount: 120000,
    status: "Success",
  },
  {
    id: "TXN-1004",
    date: "2025-09-13",
    merchant: "Green Cafe",
    channel: "POS",
    amount: 8000,
    status: "Pending",
  },
];

export default function FintechDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pt-28 text-slate-900 dark:text-slate-100">
      {/* ✅ pt-28 prevents content from being hidden under the fixed navbar */}

      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center text-white font-bold text-xl">
            NF
          </div>
          <div>
            <h1 className="text-2xl font-semibold">NairaFlow — SME Dashboard</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Insights, mobile-money flows and payment analytics for Nigerian SMEs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-600 dark:text-slate-400">Date range</div>
          <select className="px-3 py-2 rounded-md border bg-white dark:bg-slate-800 text-sm dark:border-slate-700">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Year to date</option>
          </select>
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm">
            Export
          </button>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-6">
        {/* Left column: KPIs + charts */}
        <section className="col-span-8 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card title="Total Volume">
              ₦{numberWithCommas(4_250_000)}
              <p className="mt-1 text-xs text-green-600">+12% vs last month</p>
            </Card>
            <Card title="Transactions">
              {numberWithCommas(1_820)}
              <p className="mt-1 text-xs text-green-600">Avg ₦2,335 per txn</p>
            </Card>
            <Card title="Success Rate">
              93.6%
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Minimal disputes and chargebacks
              </p>
            </Card>
          </div>

          <Card title="Revenue & Transactions (Monthly)" subtitle="NGN • All merchants">
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value) => `₦${numberWithCommas(value as number)}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card title="Payments by Channel">
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentsByChannel}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    >
                      {paymentsByChannel.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Payment Value (by day)">
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySample()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      formatter={(value) => `₦${numberWithCommas(value as number)}`}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </section>

        {/* Right column */}
        <aside className="col-span-4 space-y-6">
          <Card title="Quick Actions">
            <div className="flex flex-col gap-3">
              <button className="w-full px-3 py-2 rounded-md border text-sm">
                Create Invoice
              </button>
              <button className="w-full px-3 py-2 rounded-md bg-green-500 text-white text-sm">
                Request Payment
              </button>
              <button className="w-full px-3 py-2 rounded-md border text-sm">
                Reconcile
              </button>
            </div>
          </Card>

          <Card title="Recent Mobile Money Transactions">
            <div className="space-y-3">
              {transactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{t.merchant}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {t.channel} • {t.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      ₦{numberWithCommas(t.amount)}
                    </div>
                    <div className={`text-xs ${statusColor(t.status)}`}>
                      {t.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm px-3 py-2 rounded-md border">
                View all transactions
              </button>
            </div>
          </Card>

          <Card title="Top Performing Merchants">
            <ol className="list-decimal list-inside text-sm space-y-1 text-slate-700 dark:text-slate-300">
              <li>Adenike Grocery — ₦1,250,000</li>
              <li>Okada Rental — ₦860,000</li>
              <li>BlueTailor — ₦540,000</li>
            </ol>
          </Card>
        </aside>

        {/* Table */}
        <section className="col-span-12">
          <Card title="Transaction Log" subtitle="Showing latest 50 transactions">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 dark:text-slate-400 border-b dark:border-slate-700">
                    <th className="py-3 px-2">Txn ID</th>
                    <th className="py-3 px-2">Date</th>
                    <th className="py-3 px-2">Merchant</th>
                    <th className="py-3 px-2">Channel</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.concat(generateFake(12)).map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b last:border-b-0 border-slate-200 dark:border-slate-700"
                    >
                      <td className="py-3 px-2 font-mono text-xs">{tx.id}</td>
                      <td className="py-3 px-2">{tx.date}</td>
                      <td className="py-3 px-2">{tx.merchant}</td>
                      <td className="py-3 px-2">{tx.channel}</td>
                      <td className="py-3 px-2">
                        ₦{numberWithCommas(tx.amount)}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${statusPill(
                            tx.status
                          )}`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>

      <footer className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Designed by you • Use this component as a showcase piece in your
        portfolio. Replace data with real feeds or snapshots for production.
      </footer>
    </div>
  );
}

// ---------- Helper Card Wrapper ----------
function Card({ title, subtitle, children }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">{title}</h3>
        {subtitle && <div className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

// ---------- Helper utilities ----------
function numberWithCommas(x: number | null) {
  if (x == null) return "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function statusColor(status: string) {
  switch (status) {
    case "Success":
      return "text-green-600";
    case "Failed":
      return "text-red-600";
    case "Pending":
      return "text-amber-600";
    default:
      return "text-slate-600 dark:text-slate-400";
  }
}

function statusPill(status: string) {
  switch (status) {
    case "Success":
      return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
    case "Failed":
      return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
    case "Pending":
      return "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200";
    default:
      return "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200";
  }
}

function dailySample() {
  return [
    { day: "Mon", value: 120000 },
    { day: "Tue", value: 90000 },
    { day: "Wed", value: 140000 },
    { day: "Thu", value: 75000 },
    { day: "Fri", value: 180000 },
    { day: "Sat", value: 220000 },
    { day: "Sun", value: 95000 },
  ];
}

function generateFake(n = 5) {
  const sampleMerchants = [
    "Adenike Grocery",
    "Green Cafe",
    "BlueTailor",
    "Okada Rental",
    "Sunset Salon",
  ];
  const channels = ["Mobile Money", "Card", "Bank Transfer", "POS"];
  const statuses = ["Success", "Failed", "Pending"];
  const arr = [];
  for (let i = 0; i < n; i++) {
    const amount = Math.floor(Math.random() * 200000) + 2000;
    const id = `TXN-${2000 + i}`;
    arr.push({
      id,
      date: `2025-09-${Math.floor(10 + Math.random() * 10)}`,
      merchant: sampleMerchants[i % sampleMerchants.length],
      channel: channels[i % channels.length],
      amount,
      status: statuses[i % statuses.length],
    });
  }
  return arr;
}
