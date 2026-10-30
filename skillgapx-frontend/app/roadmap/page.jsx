"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getLearningRoadmap } from "@/services/api";
import {
  Milestone,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Code2,
  Layers,
  Award
} from "lucide-react";

const initialRoadmap = [
  {
    week: "Week 1",
    topic: "Java Advanced Concepts",
    skill: "Java SE 17 / 21",
    progress: 100,
    status: "Completed",
    recommendedResource: "Oracle Java SE Documentation & Baeldung Collections Guide",
    resourceLink: "https://www.baeldung.com/category/java/",
    objectives: [
      "Master Java 8+ Streams API and Lambdas",
      "Understand Generics, Reflection and Annotations",
      "Multithreading, ExecutorService and Concurrent Collections",
    ],
  },
  {
    week: "Week 2",
    topic: "SQL & Query Optimization",
    skill: "PostgreSQL / MySQL",
    progress: 100,
    status: "Completed",
    recommendedResource: "Use The Index, Luke (SQL Indexing & Execution Plans)",
    resourceLink: "https://use-the-index-luke.com/",
    objectives: [
      "Complex JOINs, Subqueries and Common Table Expressions (CTEs)",
      "Database Indexing (B-Tree, Hash) and Query Execution Analysis",
      "ACID Properties, Transactions and Isolation Levels",
    ],
  },
  {
    week: "Week 3",
    topic: "Spring Boot Core & Architecture",
    skill: "Spring Boot 3.x",
    progress: 60,
    status: "In Progress",
    recommendedResource: "Spring.io Official Guides & Amigoscode Masterclass",
    resourceLink: "https://spring.io/guides",
    objectives: [
      "Inversion of Control (IoC) and Dependency Injection (DI)",
      "Spring Boot Auto-configuration & Starter POMs",
      "Spring Data JPA Entity Mapping & Repository Patterns",
    ],
  },
  {
    week: "Week 4",
    topic: "REST API Design & Security",
    skill: "REST, JWT, Spring Security",
    progress: 15,
    status: "In Progress",
    recommendedResource: "RESTful Web APIs by Leonard Richardson & Spring Security 6 Docs",
    resourceLink: "https://spring.io/projects/spring-security",
    objectives: [
      "REST architectural constraints and HTTP status code standards",
      "JWT Token-based Authentication & Role-Based Access Control",
      "Swagger / OpenAPI 3 documentation & input validations",
    ],
  },
  {
    week: "Week 5",
    topic: "Git, GitHub & DevOps Foundations",
    skill: "Git & GitHub Actions",
    progress: 0,
    status: "Upcoming",
    recommendedResource: "Pro Git Book by Scott Chacon & GitHub Skills Labs",
    resourceLink: "https://git-scm.com/book/en/v2",
    objectives: [
      "Branching strategies (GitFlow, Trunk-based development)",
      "Resolving complex merge conflicts and interactive rebasing",
      "Automated CI/CD pipelines with GitHub Actions",
    ],
  },
  {
    week: "Week 6",
    topic: "Build Full Stack Capstone Project",
    skill: "Spring Boot + React / Next.js",
    progress: 0,
    status: "Upcoming",
    recommendedResource: "Full Stack Java Capstone Architecture Guide",
    resourceLink: "https://github.com/",
    objectives: [
      "Connect Next.js frontend with Spring Boot REST microservice",
      "Containerize application using Docker and docker-compose",
      "Deploy live demo on cloud with placement presentation slides",
    ],
  },
];

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState(initialRoadmap);

  useEffect(() => {
    async function loadRoadmap() {
      let studentId = "1";
      let token = null;
      if (typeof window !== "undefined") {
        const savedId = localStorage.getItem("skillgapx_student_id");
        if (savedId) studentId = savedId;
        token = localStorage.getItem("skillgapx_token");
      }

      try {
        const data = await getLearningRoadmap(studentId, "Full Stack Developer", token);
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item, idx) => ({
            week: item.week || `Week ${idx + 1}`,
            topic: item.topic,
            skill: item.skill,
            progress: item.progress || 0,
            status: item.status || "Upcoming",
            recommendedResource: item.recommendedResource || "Official Documentation & Guides",
            resourceLink: "https://spring.io/guides",
            objectives: [
              `Target proficiency in ${item.skill} to bridge MCA benchmark gap`,
              `Practice coding exercises and implementation tasks`,
              `Prepare for technical placement interview questions`,
            ],
          }));
          setRoadmap(mapped);
        }
      } catch (err) {
        console.info("Using cached learning roadmap (Backend offline)");
      }
    }

    loadRoadmap();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "In Progress":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  const completedCount = roadmap.filter((r) => r.status === "Completed").length;
  const overallProgress = Math.round((completedCount / roadmap.length) * 100);

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
                <span>Custom Placement Preparation Plan</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Personalized 6-Week Learning Roadmap
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                AI-curated milestones designed to close critical Java Full Stack gaps before campus drives
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 min-w-[220px]">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-400">Roadmap Progress</span>
                <span className="text-indigo-400 font-bold">{overallProgress}% ({completedCount}/6 Weeks)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Timeline Layout */}
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 sm:before:left-8 before:w-0.5 before:bg-slate-800 before:hidden sm:before:block">
            {roadmap.map((item, index) => {
              const isCompleted = item.status === "Completed";
              const isInProgress = item.status === "In Progress";

              return (
                <div key={item.week} className="relative sm:pl-16">
                  {/* Timeline Dot Marker */}
                  <div
                    className={`hidden sm:flex absolute left-6 top-6 -translate-x-1/2 w-5 h-5 rounded-full border-2 items-center justify-center transition-colors ${
                      isCompleted
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : isInProgress
                        ? "border-purple-500 bg-slate-950 text-purple-400 ring-4 ring-purple-500/20"
                        : "border-slate-700 bg-slate-900 text-slate-500"
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>

                  {/* Card Content */}
                  <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0f172a]/70 shadow-lg">
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                          {item.week}
                        </span>
                        <h2 className="text-lg font-bold text-white tracking-tight">
                          {item.topic}
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-medium">
                          Skill: <strong className="text-slate-200">{item.skill}</strong>
                        </span>
                        <span
                          className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 mb-5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-medium">Module Completion</span>
                        <span className="text-slate-200 font-bold">{item.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isCompleted
                              ? "bg-emerald-500"
                              : isInProgress
                              ? "bg-purple-500"
                              : "bg-slate-700"
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Key Objectives */}
                    <div className="space-y-2 mb-5">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Core Learning Objectives:
                      </span>
                      <ul className="space-y-1.5">
                        {item.objectives.map((obj, i) => (
                          <li
                            key={i}
                            className="text-xs text-slate-300 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended Resource Link */}
                    <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-400">
                        <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>Recommended Resource:</span>
                        <strong className="text-slate-200">{item.recommendedResource}</strong>
                      </div>
                      <a
                        href={item.resourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <span>Open Study Guide</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
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
