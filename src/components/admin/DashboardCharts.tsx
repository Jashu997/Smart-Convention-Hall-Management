"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";

type RevenueData = {
  name: string;
  revenue: number;
};

type StatusData = {
  name: string;
  value: number;
};

type DashboardChartsProps = {
  revenueData: RevenueData[];
  statusData: StatusData[];
  monthlyRevenue: RevenueData[];
  packagePopularity: StatusData[];
  theme: "dark" | "light";
};

const COLORS = ["#facc15", "#22c55e", "#3b82f6", "#ef4444"];

export default function DashboardCharts({
  revenueData,
  statusData,
  monthlyRevenue,
  packagePopularity,
  theme,
}: DashboardChartsProps) {
  const cardClass = theme === "dark"
    ? "border-white/10 bg-slate-900/80"
    : "border-slate-200 bg-white/90";

  const textClass = theme === "dark" ? "text-white" : "text-slate-900";
  const mutedText = theme === "dark" ? "text-slate-400" : "text-slate-500";

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${mutedText}`}>Monthly revenue</p>
            <h2 className={`text-xl font-semibold ${textClass}`}>Revenue trend</h2>
          </div>
          <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-500">
            +18.4%
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyRevenue}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#334155" : "#e2e8f0"} />
            <XAxis dataKey="name" tick={{ fill: mutedText, fontSize: 12 }} />
            <YAxis tick={{ fill: mutedText, fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#22d3ee" fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${mutedText}`}>Weekly performance</p>
            <h2 className={`text-xl font-semibold ${textClass}`}>Booking momentum</h2>
          </div>
          <div className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-500">
            Live
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#334155" : "#e2e8f0"} />
            <XAxis dataKey="name" tick={{ fill: mutedText, fontSize: 12 }} />
            <YAxis tick={{ fill: mutedText, fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
        <div className="mb-5">
          <p className={`text-sm font-medium ${mutedText}`}>Package mix</p>
          <h2 className={`text-xl font-semibold ${textClass}`}>Popular packages</h2>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={packagePopularity} dataKey="value" outerRadius={90} innerRadius={55} paddingAngle={3} label>
              {packagePopularity.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={`rounded-[28px] border p-6 shadow-[0_16px_70px_rgba(15,23,42,0.08)] ${cardClass}`}>
        <div className="mb-5">
          <p className={`text-sm font-medium ${mutedText}`}>Status distribution</p>
          <h2 className={`text-xl font-semibold ${textClass}`}>Booking lifecycle</h2>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={statusData} dataKey="value" outerRadius={90} innerRadius={55} paddingAngle={3} label>
              {statusData.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}