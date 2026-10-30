"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getCareerRecommendations } from "@/services/api";
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Database,
  Cloud,
  Layers,
  Code
} from "lucide-react";

const roleIconMap = {
  "Full Stack Developer": Layers,
  "Java Developer": Code,
  "Cloud Engineer": Cloud,
  "Python Developer": Cpu,
  "Data Analyst": Database,
  "Data Scientist": Database,
  "Machine Learning Engineer": Cpu,
};

// Initial Career recommendations for MCA candidates
const initialRoles = [
  {
    id: "full-stack",
    title: "Full Stack Developer",
    matchPercentage: 88,
    requiredSkills: ["Java", "Spring Boot", "React", "SQL", "Git", "REST APIs"],
    matchingSkills: ["Java", "React", "SQL", "Git"],
    missingSkills: ["Spring Boot Advanced", "Docker/Microservices"],
    recommendation:
      "Highest placement compatibility! Completing the 2-week Spring Boot module will make you interview-ready for tier-1 IT product companies.",
    icon: Layers,
    hiringDemand: "Very High",
  },
  {
    id: "java-dev",
    title: "Java Developer",
    matchPercentage: 85,
    requiredSkills: ["Core Java", "Collections", "OOP", "SQL", "Spring Boot", "Hibernate"],
    matchingSkills: ["Core Java", "OOP", "SQL", "Collections"],
    missingSkills: ["Spring Boot REST", "Hibernate ORM"],
    recommendation:
      "Strong foundational competencies in Java and SQL. Focus on JPA/Hibernate entity relationships and Spring dependency injection.",
    icon: Code,
    hiringDemand: "High",
  },
  {
    id: "cloud-eng",
    title: "Cloud Engineer",
    matchPercentage: 74,
    requiredSkills: ["Linux", "Git", "Docker", "AWS / GCP", "CI/CD Pipelines", "Networking"],
    matchingSkills: ["Linux Basics", "Git", "Networking Core"],
    missingSkills: ["AWS Architecture", "Docker", "Kubernetes", "CI/CD"],
    recommendation:
      "Good systems understanding. Target AWS Certified Solutions Architect Associate and containerization basics to bridge cloud gaps.",
    icon: Cloud,
    hiringDemand: "Very High",
  },
  {
    id: "python-dev",
    title: "Python Developer",
    matchPercentage: 72,
    requiredSkills: ["Python", "Django/FastAPI", "SQL", "Data Structures", "REST APIs"],
    matchingSkills: ["Python Core", "SQL", "Data Structures"],
    missingSkills: ["FastAPI/Django Framework", "Asynchronous Programming"],
    recommendation:
      "Good algorithmic knowledge. Build a portfolio CRUD application using FastAPI and PostgreSQL to close the framework gap.",
    icon: Cpu,
    hiringDemand: "High",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    matchPercentage: 70,
    requiredSkills: ["SQL", "Python", "Pandas", "Power BI / Tableau", "Statistics"],
    matchingSkills: ["Advanced SQL", "Python Core"],
    missingSkills: ["Pandas/NumPy", "Tableau/Power BI", "Exploratory Data Analysis"],
    recommendation:
      "Your strong SQL score gives you a head start. Practice business intelligence dashboards and statistical hypothesis testing.",
    icon: Database,
    hiringDemand: "Medium",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    matchPercentage: 62,
    requiredSkills: ["Python", "Machine Learning", "Linear Algebra", "SQL", "Pandas", "Scikit-Learn"],
    matchingSkills: ["Python Basics", "SQL"],
    missingSkills: ["Scikit-Learn", "Model Evaluation", "Calculus & Probability"],
    recommendation:
      "Solid mathematics core. Build end-to-end regression and classification models with Scikit-Learn to qualify for analytics tracks.",
    icon: Database,
    hiringDemand: "High",
  },
  {
    id: "ml-eng",
    title: "Machine Learning Engineer",
    matchPercentage: 58,
    requiredSkills: ["Python", "TensorFlow/PyTorch", "Data Pipelines", "MLOps", "Model Deployment"],
    matchingSkills: ["Python Core"],
    missingSkills: ["Deep Learning", "TensorFlow", "MLOps Pipelines", "Model Serving"],
    recommendation:
      "Significant skill gaps in neural networks and deployment pipelines. Focus first on Full Stack or Java roles for immediate placement.",
    icon: Cpu,
    hiringDemand: "High",
  },
];

export default function CareerPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadCareerRecommendations() {
      let studentId = "1";
      let token = null;
      if (typeof window !== "undefined") {
        const savedId = localStorage.getItem("skillgapx_student_id");
        if (savedId) studentId = savedId;
        token = localStorage.getItem("skillgapx_token");
      }

      try {
        const data = await getCareerRecommendations(studentId, token);
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((r) => ({
            id: r.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
            title: r.title,
            matchPercentage: r.matchPercentage,
            requiredSkills: r.requiredSkills || [],
            matchingSkills: r.matchingSkills || [],
            missingSkills: r.missingSkills || [],
            recommendation: r.recommendation,
            hiringDemand: r.hiringDemand,
            icon: roleIconMap[r.title] || Layers,
          }));
          setRoles(mapped);
        }
      } catch (err) {
        console.info("Using cached career recommendations (Backend offline)");
      }
    }

    loadCareerRecommendations();
  }, []);

  const filteredRoles = roles.filter((role) => {
    if (filter === "high") return role.matchPercentage >= 80;
    if (filter === "medium") return role.matchPercentage >= 70 && role.matchPercentage < 80;
    return true;
  });

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
                <span>AI Career Recommendation Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Recommended Roles & Placement Match
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Machine learning model matching student skill profile with active MCA hiring profiles
              </p>
            </div>

            {/* Match Filter Tabs */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === "all" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                All Roles (7)
              </button>
              <button
                onClick={() => setFilter("high")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === "high" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                High Match (80%+)
              </button>
              <button
                onClick={() => setFilter("medium")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === "medium" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                Medium Match (70-79%)
              </button>
            </div>
          </div>

          {/* Roles Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoles.map((role) => {
              const Icon = role.icon;
              const isHigh = role.matchPercentage >= 80;
              const isMed = role.matchPercentage >= 70 && role.matchPercentage < 80;

              return (
                <div
                  key={role.id}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Title & Match Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight">
                            {role.title}
                          </h3>
                          <span className="text-[11px] text-slate-400 font-medium">
                            Hiring Demand: <span className="text-emerald-400 font-semibold">{role.hiringDemand}</span>
                          </span>
                        </div>
                      </div>

                      {/* Percentage Badge */}
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                            isHigh
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : isMed
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          {role.matchPercentage}% Match
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-800 mb-5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isHigh
                            ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                            : isMed
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                            : "bg-gradient-to-r from-amber-500 to-orange-500"
                        }`}
                        style={{ width: `${role.matchPercentage}%` }}
                      />
                    </div>

                    {/* Matching Skills */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Student Matching Skills ({role.matchingSkills.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {role.matchingSkills.map((sk) => (
                            <span
                              key={sk}
                              className="px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Missing Skills */}
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Critical Missing Skills ({role.missingSkills.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {role.missingSkills.map((sk) => (
                            <span
                              key={sk}
                              className="px-2 py-0.5 rounded-md text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 flex items-center gap-1"
                            >
                              <AlertCircle className="w-3 h-3 text-rose-400" />
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI Recommendation Quote */}
                    <div className="mt-5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <span className="font-semibold text-indigo-300 block mb-1">AI Recommendation:</span>
                      {role.recommendation}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Spring Boot API Connected</span>
                    <Link
                      href="/roadmap"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>View Custom Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
