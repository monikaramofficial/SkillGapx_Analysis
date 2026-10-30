"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SkillChart from "@/components/SkillChart";
import { getResults } from "@/services/api";
import {
  Award,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Milestone,
  Target,
  FileCheck
} from "lucide-react";

export default function ResultsPage() {
  const [resultsData, setResultsData] = useState({
    overallScore: 80,
    totalQuestions: 5,
    correctCount: 4,
    readinessScore: 76,
    assessmentTitle: "MCA Core Technical Benchmark (OOP, Spring Boot, SQL, DSA)",
  });

  const [strengthsList, setStrengthsList] = useState([
    {
      skill: "SQL & Relational Queries",
      detail: "Perfect score on GROUP BY & HAVING aggregate filtering concepts.",
      badge: "Mastered",
    },
    {
      skill: "Java Polymorphism & OOP",
      detail: "Accurate understanding of runtime dynamic method dispatch.",
      badge: "Advanced",
    },
    {
      skill: "Git Branching Workflows",
      detail: "Clear comprehension of rebase vs. merge linear commit histories.",
      badge: "Proficient",
    },
  ]);

  const [weaknessesList, setWeaknessesList] = useState([
    {
      skill: "Spring Boot Controller Annotations",
      detail: "Misidentified @RestController composition with response body serialization.",
      impact: "High Impact on Backend Roles",
    },
    {
      skill: "DSA Search Complexities",
      detail: "Need revision on worst-case vs. average-case tree height boundaries.",
      impact: "Medium Impact on Coding Rounds",
    },
  ]);

  useEffect(() => {
    async function loadResults() {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("skillgapx_latest_result");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const token = localStorage.getItem("skillgapx_token");

            if (parsed.resultId) {
              try {
                const apiRes = await getResults(parsed.resultId, token);
                if (apiRes) {
                  setResultsData({
                    overallScore: apiRes.overallScore || 75,
                    totalQuestions: apiRes.totalQuestions || 4,
                    correctCount: apiRes.correctCount !== undefined ? apiRes.correctCount : 3,
                    readinessScore: apiRes.readinessScore || 71,
                    assessmentTitle: "MCA Core Technical Benchmark (Live Evaluated)",
                  });
                  if (apiRes.strengths && apiRes.strengths.length > 0) {
                    setStrengthsList(apiRes.strengths.map(s => ({
                      skill: s,
                      detail: `Demonstrated high accuracy and strong concept retention in ${s}.`,
                      badge: "Verified"
                    })));
                  }
                  if (apiRes.weaknesses && apiRes.weaknesses.length > 0) {
                    setWeaknessesList(apiRes.weaknesses.map(w => ({
                      skill: w,
                      detail: `Review core patterns and practice coding exercises in ${w}.`,
                      impact: "Recommended Revision"
                    })));
                  }
                  return;
                }
              } catch (err) {
                console.info("Using cached assessment result data");
              }
            }

            if (parsed.scorePercentage !== undefined) {
              setResultsData((prev) => ({
                ...prev,
                overallScore: parsed.scorePercentage,
                totalQuestions: parsed.totalQuestions || 5,
                correctCount: parsed.correctCount || 4,
                readinessScore: parsed.readinessScore || Math.min(100, Math.round(parsed.scorePercentage * 0.95)),
              }));
            }
          } catch (e) {
            // ignore
          }
        }
      }
    }
    loadResults();
  }, []);

  const chartComparison = [
    { skill: "Java OOP", current: 85, required: 85 },
    { skill: "Spring Boot", current: 65, required: 82 },
    { skill: "SQL Clauses", current: 90, required: 80 },
    { skill: "DSA Trees", current: 75, required: 85 },
    { skill: "Git Rebase", current: 85, required: 75 },
  ];

  const strengths = [
    {
      skill: "SQL & Relational Queries",
      detail: "Perfect score on GROUP BY & HAVING aggregate filtering concepts.",
      badge: "Mastered",
    },
    {
      skill: "Java Polymorphism & OOP",
      detail: "Accurate understanding of runtime dynamic method dispatch.",
      badge: "Advanced",
    },
    {
      skill: "Git Branching Workflows",
      detail: "Clear comprehension of rebase vs. merge linear commit histories.",
      badge: "Proficient",
    },
  ];

  const weaknesses = [
    {
      skill: "Spring Boot Controller Annotations",
      detail: "Misidentified @RestController composition with response body serialization.",
      impact: "High Impact on Backend Roles",
    },
    {
      skill: "DSA Search Complexities",
      detail: "Need revision on worst-case vs. average-case tree height boundaries.",
      impact: "Medium Impact on Coding Rounds",
    },
  ];

  const recommendedSkills = [
    { name: "Spring Boot REST Architecture", priority: "Urgent", week: "Week 3" },
    { name: "Binary Tree Rotations & Traversal", priority: "High", week: "Week 4" },
    { name: "Database Indexing & Query Tuning", priority: "Medium", week: "Week 2" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Header */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/50 border border-indigo-500/20 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Assessment Evaluation Completed</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Diagnostic Results & Skill Gap Report
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  {resultsData.assessmentTitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/assessment"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </Link>
                <Link
                  href="/roadmap"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <Milestone className="w-3.5 h-3.5" />
                  <span>Update My Roadmap</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Overall Assessment Score */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Assessment Score</span>
                <Award className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">{resultsData.overallScore}%</span>
                <span className="text-xs text-emerald-400 font-semibold">
                  ({resultsData.correctCount} / {resultsData.totalQuestions} correct)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Above the average candidate threshold for campus recruitment.
              </p>
            </div>

            {/* Placement Readiness Prediction */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Placement Readiness</span>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">{resultsData.readinessScore}%</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  Almost Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Closing 1 remaining framework gap elevates readiness to 85%+.
              </p>
            </div>

            {/* Identified Skill Gaps Count */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Primary Skill Gap</span>
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-rose-400">Spring Boot</span>
                <span className="text-xs text-rose-300 font-semibold">-17% Gap</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Recommended focus area for this week's study plan.
              </p>
            </div>
          </div>

          {/* Visualization: SkillChart */}
          <div>
            <SkillChart
              data={chartComparison}
              title="Assessment Domain Breakdown (Achieved vs Industry Standard)"
              height={320}
            />
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Demonstrated Strengths</h3>
              </div>
              <div className="space-y-3">
                {strengthsList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.skill}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.detail}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses / Skill Gaps */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">Skill Gaps & Weaknesses</h3>
              </div>
              <div className="space-y-3">
                {weaknessesList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.skill}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.detail}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                      {item.impact || "Action Item"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Skills to Learn */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">
                  Recommended Next Steps to Reach 85%+ Placement Readiness
                </h3>
              </div>
              <Link
                href="/roadmap"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Go to Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedSkills.map((rec, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
                        {rec.week}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        {rec.priority}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{rec.name}</h4>
                  </div>
                  <Link
                    href="/roadmap"
                    className="mt-4 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <span>View Learning Module</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
