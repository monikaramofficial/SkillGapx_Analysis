"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import {
  LayoutDashboard,
  ClipboardCheck,
  Code2,
  Briefcase,
  Milestone,
  Award,
  UserCheck,
  LogOut,
  Zap,
} from "lucide-react";

export default function Sidebar({ studentName = "MCA Student", placementStatus = "Almost Ready" }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("skillgapx_user");
        localStorage.removeItem("skillgapx_token");
        localStorage.removeItem("skillgapx_student_id");
        localStorage.removeItem("skillgapx_latest_result");
      }
      router.push("/login");
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Assessment", href: "/assessment", icon: ClipboardCheck },
    { name: "My Skills", href: "/skills", icon: Code2 },
    { name: "Career", href: "/career", icon: Briefcase },
    { name: "Learning Roadmap", href: "/roadmap", icon: Milestone },
    { name: "Results", href: "/results", icon: Award },
    { name: "Profile", href: "/dashboard#profile", icon: UserCheck },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col justify-between border-r border-slate-800 bg-[#0c1222] min-h-[calc(100vh-4rem)] p-4">
      {/* Top Section / Navigation */}
      <div className="space-y-6">
        {/* Student Quick Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border border-indigo-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-300 text-sm">
              MCA
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-white truncate">{studentName}</h4>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {placementStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Links */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            System Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Section / System Status & Logout */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        {/* Backend Connect Indicator */}
        <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px]">Spring Boot API</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            Ready
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
