"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// Default sample data for MCA students
const defaultSkillData = [
  { skill: "Java", current: 78, required: 88 },
  { skill: "SQL", current: 82, required: 85 },
  { skill: "Spring Boot", current: 65, required: 82 },
  { skill: "Git", current: 85, required: 80 },
  { skill: "Python", current: 70, required: 75 },
  { skill: "Data Structures", current: 68, required: 85 },
];

// Custom dark mode tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const current = payload[0]?.value || 0;
    const required = payload[1]?.value || 0;
    const gap = Math.max(0, required - current);

    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md">
        <p className="text-sm font-bold text-white mb-2">{label}</p>
        <div className="space-y-1 text-xs">
          <p className="text-indigo-400 font-medium flex items-center justify-between gap-4">
            <span>Current Level:</span>
            <span className="font-bold">{current}%</span>
          </p>
          <p className="text-pink-400 font-medium flex items-center justify-between gap-4">
            <span>Industry Target:</span>
            <span className="font-bold">{required}%</span>
          </p>
          <div className="pt-1.5 mt-1.5 border-t border-slate-800 text-[11px] flex items-center justify-between">
            <span className="text-slate-400">Skill Gap:</span>
            <span className={gap === 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
              {gap === 0 ? "Target Met" : `-${gap}%`}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function SkillChart({
  data = defaultSkillData,
  title = "Skill Gap Analysis (Current vs. Industry Target)",
  height = 320,
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="w-full flex items-center justify-center rounded-2xl border border-slate-800 bg-[#0f172a]/60 p-6"
        style={{ height }}
      >
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <span>Loading skill visualization...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#0f172a]/70 p-5 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-slate-400">
            Real-time comparative benchmark across key technical competencies
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-indigo-500" />
            <span className="text-slate-300">Current Level</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-pink-500" />
            <span className="text-slate-300">Required Level</span>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="skill"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              domain={[0, 100]}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="current"
              name="Current Level"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              dataKey="required"
              name="Required Level"
              fill="#ec4899"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
