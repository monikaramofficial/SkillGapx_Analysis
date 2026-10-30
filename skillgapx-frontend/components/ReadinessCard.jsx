"use client";

import { CheckCircle2, TrendingUp, HelpCircle } from "lucide-react";

export default function ReadinessCard({
  readinessScore = 72,
  status = "Almost Ready",
  breakdown = [
    { label: "Technical Skills", score: 78, color: "bg-indigo-500" },
    { label: "Problem Solving", score: 70, color: "bg-purple-500" },
    { label: "Communication", score: 80, color: "bg-blue-500" },
    { label: "Projects", score: 75, color: "bg-emerald-500" },
    { label: "Certifications", score: 60, color: "bg-amber-500" },
  ],
}) {
  // SVG circular gauge geometry
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight">
            Placement Readiness
          </h3>
          <p className="text-xs text-slate-400">AI prediction model analysis</p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {status}
        </span>
      </div>

      {/* Circular Progress Gauge */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
            {/* Background Track */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              className="stroke-slate-800"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Progress Track */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke="url(#readinessGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {readinessScore}%
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Readiness
            </span>
          </div>
        </div>

        {/* Quick Insight */}
        <div className="text-center sm:text-left space-y-1 max-w-[200px]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
            <TrendingUp className="w-4 h-4" />
            <span>High Probability Tier</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Candidate is in the top 25th percentile for MCA campus drives. Closing 2 core gaps pushes readiness to 85%+.
          </p>
        </div>
      </div>

      {/* Sub-Metrics Breakdown */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Evaluation Components
        </h4>
        <div className="space-y-2.5">
          {breakdown.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">{item.label}</span>
                <span className="text-white font-bold">{item.score}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
