"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SkillCard from "@/components/SkillCard";
import SkillChart from "@/components/SkillChart";
import ReadinessCard from "@/components/ReadinessCard";
import { getStudentProfile, getSkills } from "@/services/api";
import {
  Award,
  TrendingUp,
  Code2,
  AlertCircle,
  ArrowRight,
  ClipboardCheck,
  Briefcase,
  Milestone,
  CheckCircle2,
  Calendar,
  Sparkles
} from "lucide-react";

export default function DashboardPage() {
  const [student, setStudent] = useState({
    name: "Rahul Sharma",
    degree: "MCA (Master of Computer Applications)",
    overallScore: 78,
    readinessScore: 72,
    totalSkills: 10,
    skillGaps: 7,
  });

  const [highlightSkills, setHighlightSkills] = useState([
    { skillName: "Java", currentScore: 78, requiredScore: 88, gap: 10, level: "Intermediate" },
    { skillName: "Spring Boot", currentScore: 65, requiredScore: 82, gap: 17, level: "Intermediate" },
    { skillName: "SQL", currentScore: 82, requiredScore: 85, gap: 3, level: "Advanced" },
    { skillName: "Data Structures", currentScore: 68, requiredScore: 85, gap: 17, level: "Intermediate" },
  ]);

  // Load live student metrics from Spring Boot Backend
  useEffect(() => {
    async function loadDashboardData() {
      let studentId = "1";
      let token = null;

      if (typeof window !== "undefined") {
        const savedId = localStorage.getItem("skillgapx_student_id");
        if (savedId) studentId = savedId;
        token = localStorage.getItem("skillgapx_token");

        const savedUser = localStorage.getItem("skillgapx_user");
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            if (parsed.displayName) {
              setStudent((prev) => ({ ...prev, name: parsed.displayName }));
            }
          } catch (e) {}
        }
      }

      try {
        // Fetch student profile from Java backend
        const profile = await getStudentProfile(studentId, token);
        if (profile) {
          setStudent((prev) => ({
            ...prev,
            name: profile.fullName || prev.name,
            degree: profile.degree || prev.degree,
            overallScore: profile.overallSkillScore || prev.overallScore,
            readinessScore: profile.readinessScore || prev.readinessScore,
            totalSkills: profile.totalSkills || prev.totalSkills,
            skillGaps: profile.skillGaps !== undefined ? profile.skillGaps : prev.skillGaps,
          }));
        }

        // Fetch student skills from Java backend
        const skillsData = await getSkills(studentId, token);
        if (Array.isArray(skillsData) && skillsData.length > 0) {
          setHighlightSkills(skillsData.slice(0, 4));
        }
      } catch (err) {
        console.info("Using cached/demo dashboard metrics (Backend offline or initializing)");
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar studentName={student.name} />

      {/* Main Layout with Sidebar and Dashboard Body */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar studentName={student.name} placementStatus="Almost Ready" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* Welcome Banner */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/40 border border-indigo-500/20 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>MCA Placement Analytics Active</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Welcome back, {student.name}!
                </h1>
                <p className="mt-1 text-sm text-slate-300">
                  {student.degree} · AI Skill Verification Engine is benchmarking your profile against IT recruiters.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/assessment"
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Take New Assessment</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Stat Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Overall Skill Score */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-[#0f172a]/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Overall Skill Score</span>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{student.overallScore}%</span>
                <span className="text-xs text-emerald-400 font-semibold">+4% this month</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${student.overallScore}%` }}
                />
              </div>
            </div>

            {/* Placement Readiness Score */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-[#0f172a]/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Placement Readiness</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{student.readinessScore}%</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  Almost Ready
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  style={{ width: `${student.readinessScore}%` }}
                />
              </div>
            </div>

            {/* Number of Skills */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-[#0f172a]/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Verified Skills</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Code2 className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{student.totalSkills}</span>
                <span className="text-xs text-slate-400">across 4 domains</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">Java, Python, SQL, Web Stack...</p>
            </div>

            {/* Number of Skill Gaps */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-[#0f172a]/70">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">Identified Gaps</span>
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-rose-400">{student.skillGaps}</span>
                <span className="text-xs text-rose-300 font-semibold">Priority Action</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">Spring Boot, DSA Trees, Docker, CI/CD</p>
            </div>
          </div>

          {/* Core Analytics: SkillChart + ReadinessCard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SkillChart />
            </div>
            <div className="lg:col-span-1">
              <ReadinessCard
                readinessScore={student.readinessScore}
                status="Almost Ready"
              />
            </div>
          </div>

          {/* 3 Secondary Sections: Recent Assessment, Career Recommendation, Roadmap Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Assessment Card */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-sm font-bold text-white">Recent Assessment</h3>
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Yesterday
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white">Java & Spring Boot Core MCQ</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluated 20 questions across OOP, Collections, Multithreading & Spring REST.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Score Achieved:</span>
                  <span className="text-sm font-bold text-emerald-400">76% (Proficient)</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800">
                <Link
                  href="/results"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 py-1"
                >
                  <span>View Diagnostic Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* AI Career Recommendation */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-pink-400" />
                    <h3 className="text-sm font-bold text-white">Career Recommendation</h3>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    85% Match
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white">Full Stack Java Developer</h4>
                <p className="text-xs text-slate-400 mt-1">
                  High alignment with Java, Spring Boot, React, and SQL competency scores.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Java Met
                  </span>
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    SQL Met
                  </span>
                  <span className="px-2 py-0.5 text-[10px] rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    Spring Gap: -17%
                  </span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800">
                <Link
                  href="/career"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 py-1"
                >
                  <span>Explore 7 Recommended Roles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Learning Roadmap Preview */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Milestone className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-bold text-white">Roadmap Milestone</h3>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Week 3 of 6
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white">Spring Boot & REST APIs</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Current objective: Build JPA Repositories and secure REST controller endpoints.
                </p>
                <div className="mt-3 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Curriculum Progress</span>
                    <span className="text-purple-400 font-bold">50%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: "50%" }} />
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800">
                <Link
                  href="/roadmap"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 py-1"
                >
                  <span>View 6-Week Learning Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Highlight Skill Cards Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Key Verified Skills</h2>
                <p className="text-xs text-slate-400">
                  Priority competencies evaluated by the SkillGapX AI verification engine
                </p>
              </div>
              <Link
                href="/skills"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>View All 12 Skills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {highlightSkills.map((s) => (
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
          </div>
        </main>
      </div>
    </div>
  );
}
