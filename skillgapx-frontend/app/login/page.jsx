"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, isFirebaseConfigured } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { login as apiLogin } from "@/services/api";
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Form basic validation
    if (!email.trim() || !password) {
      setError("Please fill in both your email address and password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setLoading(true);

    try {
      let backendAuthSuccess = false;

      // 1. Authenticate with Java Spring Boot REST backend
      try {
        const backendRes = await apiLogin({ email, password });
        if (backendRes && backendRes.token) {
          backendAuthSuccess = true;
          if (typeof window !== "undefined") {
            localStorage.setItem("skillgapx_token", backendRes.token);
            localStorage.setItem("skillgapx_student_id", String(backendRes.studentId || 1));
            localStorage.setItem(
              "skillgapx_user",
              JSON.stringify({
                uid: backendRes.studentId || 1,
                email: backendRes.email || email,
                displayName: backendRes.fullName || email.split("@")[0],
                token: backendRes.token,
              })
            );
          }
        }
      } catch (apiErr) {
        console.warn("Spring Boot Backend login attempt notice:", apiErr.message);
      }

      // 2. Authenticate with Firebase Auth if configured
      if (isFirebaseConfigured && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (typeof window !== "undefined" && !backendAuthSuccess) {
          localStorage.setItem(
            "skillgapx_user",
            JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || email.split("@")[0],
            })
          );
        }
      } else if (!backendAuthSuccess) {
        // Fallback local session for demo purposes
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "skillgapx_user",
            JSON.stringify({
              uid: 1,
              email: email,
              displayName: email.split("@")[0] || "MCA Candidate",
            })
          );
        }
      }

      // Redirect user to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Firebase Auth Login Error:", err);
      let message = "Failed to sign in. Please check your credentials.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        message = "Invalid email or password.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Please try again in a few minutes.";
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // One-click quick test for project demonstration
  const handleDemoLogin = async () => {
    setEmail("student@mca.edu");
    setPassword("password123");
    try {
      const res = await apiLogin({ email: "student@mca.edu", password: "password123" });
      if (res && res.token) {
        localStorage.setItem("skillgapx_token", res.token);
        localStorage.setItem("skillgapx_student_id", String(res.studentId || 1));
        localStorage.setItem(
          "skillgapx_user",
          JSON.stringify({
            uid: res.studentId || 1,
            email: "student@mca.edu",
            displayName: res.fullName || "Rahul Sharma (MCA)",
            token: res.token,
          })
        );
      }
    } catch (e) {
      if (typeof window !== "undefined") {
        localStorage.setItem("skillgapx_student_id", "1");
        localStorage.setItem(
          "skillgapx_user",
          JSON.stringify({
            uid: 1,
            email: "student@mca.edu",
            displayName: "Rahul Sharma (MCA)",
          })
        );
      }
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Skill<span className="text-indigo-400">Gap</span>
            <span className="text-pink-500">X</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
          Sign In to Your Student Portal
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Access your AI skill assessments, gap matrix, and placement readiness
        </p>
      </div>

      {/* Card Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 z-10">
        <div className="glass-panel rounded-2xl p-7 sm:p-8 border border-slate-800 bg-[#0f172a]/80 shadow-2xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Student Email Address
              </label>
              <div className="relative rounded-xl border border-slate-800 bg-slate-900/80 focus-within:border-indigo-500 transition-all">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full pl-9 pr-3 py-2.5 text-sm text-white bg-transparent rounded-xl focus:outline-none placeholder-slate-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl border border-slate-800 bg-slate-900/80 focus-within:border-indigo-500 transition-all">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-sm text-white bg-transparent rounded-xl focus:outline-none placeholder-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Test Access */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-950/30 hover:bg-indigo-900/40 border border-indigo-500/30 transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>Instant Demo Access (Evaluator Mode)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Register Link */}
          <p className="mt-6 text-center text-xs text-slate-400">
            Don't have an account yet?{" "}
            <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
