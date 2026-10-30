"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SkillCard from "@/components/SkillCard";
import SkillChart from "@/components/SkillChart";
import { getSkills } from "@/services/api";
import {
  Code2,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles
} from "lucide-react";

// Technical skills matrix for MCA candidates
const initialSkills = [
  { skillName: "Java", currentScore: 78, requiredScore: 88, gap: 10, level: "Intermediate", category: "Backend" },
  { skillName: "Python", currentScore: 70, requiredScore: 75, gap: 5, level: "Intermediate", category: "Backend" },
  { skillName: "SQL", currentScore: 82, requiredScore: 85, gap: 3, level: "Advanced", category: "Database" },
  { skillName: "HTML", currentScore: 90, requiredScore: 80, gap: 0, level: "Advanced", category: "Frontend" },
  { skillName: "CSS", currentScore: 85, requiredScore: 78, gap: 0, level: "Advanced", category: "Frontend" },
  { skillName: "JavaScript", currentScore: 76, requiredScore: 82, gap: 6, level: "Intermediate", category: "Frontend" },
  { skillName: "React", currentScore: 72, requiredScore: 80, gap: 8, level: "Intermediate", category: "Frontend" },
  { skillName: "Spring Boot", currentScore: 65, requiredScore: 82, gap: 17, level: "Intermediate", category: "Backend" },
  { skillName: "Git", currentScore: 85, requiredScore: 80, gap: 0, level: "Advanced", category: "Tools" },
  { skillName: "Data Structures", currentScore: 68, requiredScore: 85, gap: 17, level: "Intermediate", category: "Core CS" },
];

export default function SkillsPage() {
  const [skills, setSkills] = useState(initialSkills);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadSkills() {
      let studentId = "1";
      let token = null;
      if (typeof window !== "undefined") {
        const savedId = localStorage.getItem("skillgapx_student_id");
        if (savedId) studentId = savedId;
        token = localStorage.getItem("skillgapx_token");
      }
      try {
        const data = await getSkills(studentId, token);
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      } catch (err) {
        console.info("Using cached skills catalog (Backend offline)");
      }
    }
    loadSkills();
  }, []);

  const categories = ["All", "Backend", "Frontend", "Database", "Core CS", "Tools"];

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.skillName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Chart data formatting
  const chartData = skills.map((s) => ({
    skill: s.skillName,
    current: s.currentScore,
    required: s.requiredScore,
  }));

  const totalMet = skills.filter((s) => s.gap <= 0).length;
  const totalGaps = skills.filter((s) => s.gap > 0).length;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Technical Skills Inventory</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Verified Skills & Gap Analysis
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Detailed comparison of student scores versus MCA industry hiring benchmarks
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400 block text-[10px]">Target Met</span>
                <span className="text-emerald-400 font-bold text-sm">{totalMet} Skills</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400 block text-[10px]">Gaps to Close</span>
                <span className="text-rose-400 font-bold text-sm">{totalGaps} Skills</span>
              </div>
            </div>
          </div>

          {/* Recharts Chart Visualization */}
          <SkillChart
            data={chartData}
            title="Comprehensive Technical Skill Benchmark (Current vs Required)"
            height={340}
          />

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills (e.g. Java, React)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-800/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                      : "bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Cards Grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredSkills.map((s) => (
                <SkillCard
                  key={s.skillName}
                  skillName={s.skillName}
                  currentScore={s.currentScore}
                  requiredScore={s.requiredScore}
                  gap={s.gap}
                  level={s.level}
                />
              ))}
            </div>

            {filteredSkills.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
                <Code2 className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-300 font-semibold">No skills matched your search</p>
                <p className="text-xs text-slate-500 mt-1">Try resetting the filter or search term</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
