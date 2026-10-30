"use client";

import { Code, CheckCircle2, AlertTriangle, ArrowUpRight } from "lucide-react";

export default function SkillCard({
  skillName = "Java",
  currentScore = 75,
  requiredScore = 85,
  gap = 10,
  level = "Intermediate",
}) {
  // Determine color themes based on level
  const getLevelBadge = (lvl) => {
    switch (lvl?.toLowerCase()) {
      case "advanced":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "intermediate":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
  };

  const isGapClosed = gap <= 0;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 bg-[#0f172a]/70 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Code className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight">{skillName}</h3>
          </div>
          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getLevelBadge(
              level
            )}`}
          >
            {level}
          </span>
        </div>

        {/* Scores Display */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 my-3">
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Your Score</p>
            <p className="text-lg font-bold text-white mt-0.5">
              {currentScore}
              <span className="text-xs text-slate-400 font-normal">/100</span>
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Industry Target</p>
            <p className="text-lg font-bold text-indigo-300 mt-0.5">
              {requiredScore}
              <span className="text-xs text-slate-400 font-normal">/100</span>
            </p>
          </div>
        </div>

        {/* Visual Progress Bars */}
        <div className="space-y-1.5 mt-3">
          <div className="flex justify-between text-[11px] font-medium">
            <span className="text-slate-400">Current Readiness</span>
            <span className="text-slate-200">{currentScore}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
            {/* Target indicator mark */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-indigo-400 z-10"
              style={{ left: `${Math.min(requiredScore, 100)}%` }}
              title={`Target: ${requiredScore}%`}
            />
            {/* Current score fill */}
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isGapClosed
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500"
              }`}
              style={{ width: `${Math.min(currentScore, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Gap Metric */}
      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400">Skill Gap Status:</span>
        {isGapClosed ? (
          <span className="flex items-center gap-1 font-semibold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Target Met
          </span>
        ) : (
          <span className="flex items-center gap-1 font-semibold text-rose-400">
            <AlertTriangle className="w-3.5 h-3.5" /> Gap: -{gap}%
          </span>
        )}
      </div>
    </div>
  );
}
