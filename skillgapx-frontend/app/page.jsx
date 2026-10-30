import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Target,
  Compass,
  TrendingUp,
  MapPin,
  CheckCircle,
  GraduationCap,
  ShieldCheck,
  Cpu,
  Layers
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "AI Skill Gap Analysis",
      description:
        "Verify your MCA technical competencies against industry recruitment benchmarks and uncover critical missing skills.",
      icon: Target,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Career Recommendation",
      description:
        "AI matches your coding skills with modern job roles like Java Developer, Full Stack Engineer, Cloud Architect, and ML Engineer.",
      icon: Compass,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Placement Readiness Prediction",
      description:
        "Predict your probability of clearing campus placement recruitment drives using machine learning evaluation models.",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Personalized Learning Roadmap",
      description:
        "Receive custom week-by-week action plans with curated resources to close skill gaps before campus interviews arrive.",
      icon: MapPin,
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const stats = [
    { value: "94%", label: "Placement Success Rate" },
    { value: "500+", label: "Verified Core Skills" },
    { value: "6 Weeks", label: "Average Gap Closure Time" },
    { value: "100%", label: "MCA Curriculum Aligned" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Skill<span className="text-indigo-400">Gap</span>
              <span className="text-pink-500">X</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>MCA Academic & Final Year Placement Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
              AI-Based Student Skill Verification,{" "}
              <span className="gradient-text">Gap Analysis & Placement Readiness</span> System
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              SkillGapX bridges the divide between college curriculum and IT industry expectations.
              Verify your technical skills, identify gaps with precision, and forecast your placement
              success.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-all"
              >
                Login to Dashboard
              </Link>
            </div>

            {/* Key Value Points */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Spring Boot REST Integration Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Firebase Secure Authentication</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Interactive Skill Visualizations</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="border-y border-slate-800/80 bg-slate-950/40 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((s, idx) => (
                <div key={idx} className="p-4">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
              System Modules
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Everything You Need to Ace Tech Placements
            </p>
            <p className="mt-4 text-sm sm:text-base text-slate-400">
              Built specifically for MCA candidates preparing for product & services campus recruitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover rounded-2xl p-7 border border-slate-800 bg-[#0f172a]/70 flex gap-5"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shrink-0 shadow-lg text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-indigo-900/50 via-slate-900 to-purple-950/50 border border-indigo-500/30 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ready to Discover Your IT Placement Readiness?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Sign in with Firebase or create your student profile to begin your skills assessment today.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30"
                >
                  Create Student Account
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80"
                >
                  Existing User Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SkillGapX System. MCA Final Year Capstone Project.</p>
      </footer>
    </div>
  );
}
