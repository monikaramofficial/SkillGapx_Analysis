"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db, isFirebaseConfigured } from "@/services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { register as apiRegister, login as apiLogin } from "@/services/api";
import { Sparkles, User, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Form validations
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-check.");
      return;
    }

    setLoading(true);

    try {
      let backendRegistered = false;

      // 1. Register with Spring Boot REST backend
      try {
        await apiRegister({ fullName, email, password });
        backendRegistered = true;
        // Auto-login to get JWT token
        const loginRes = await apiLogin({ email, password });
        if (loginRes && loginRes.token) {
          localStorage.setItem("skillgapx_token", loginRes.token);
          localStorage.setItem("skillgapx_student_id", String(loginRes.studentId || 1));
          localStorage.setItem(
            "skillgapx_user",
            JSON.stringify({
              uid: loginRes.studentId,
              email: loginRes.email,
              displayName: loginRes.fullName,
              token: loginRes.token,
            })
          );
        }
      } catch (backendErr) {
        console.warn("Backend registration notice:", backendErr.message);
      }

      // 2. Register with Firebase if configured
      if (isFirebaseConfigured && auth) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: fullName });

        if (db) {
          try {
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              fullName: fullName,
              email: email,
              degree: "MCA (Master of Computer Applications)",
              createdAt: new Date().toISOString(),
              targetRole: "Full Stack Developer",
              readinessScore: 72,
              skillsVerified: 12,
              skillGapsCount: 4,
            });
          } catch (firestoreErr) {
            console.warn("Firestore write notice:", firestoreErr.message);
          }
        }

        if (!backendRegistered && typeof window !== "undefined") {
          localStorage.setItem(
            "skillgapx_user",
            JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: fullName,
            })
          );
        }
      } else if (!backendRegistered) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "skillgapx_user",
            JSON.stringify({
              uid: "mca-" + Date.now(),
              email: email,
              displayName: fullName,
            })
          );
        }
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error("Firebase Registration Error:", err);
      let message = "Failed to create student account.";
      if (err.code === "auth/email-already-in-use") {
        message = "An account with this email already exists. Please log in.";
      } else if (err.code === "auth/weak-password") {
        message = "Password is too weak. Please use letters and numbers.";
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
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
          Create Student Account
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Begin your AI skill gap verification and placement readiness prediction
        </p>
      </div>

      {/* Registration Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 z-10">
        <div className="glass-panel rounded-2xl p-7 sm:p-8 border border-slate-800 bg-[#0f172a]/80 shadow-2xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative rounded-xl border border-slate-800 bg-slate-900/80 focus-within:border-indigo-500 transition-all">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full pl-9 pr-3 py-2.5 text-sm text-white bg-transparent rounded-xl focus:outline-none placeholder-slate-500"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                College / Personal Email
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
                  placeholder="rahul.mca@college.edu"
                  className="w-full pl-9 pr-3 py-2.5 text-sm text-white bg-transparent rounded-xl focus:outline-none placeholder-slate-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password (min. 6 characters)
              </label>
              <div className="relative rounded-xl border border-slate-800 bg-slate-900/80 focus-within:border-indigo-500 transition-all">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm text-white bg-transparent rounded-xl focus:outline-none placeholder-slate-500"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative rounded-xl border border-slate-800 bg-slate-900/80 focus-within:border-indigo-500 transition-all">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm text-white bg-transparent rounded-xl focus:outline-none placeholder-slate-500"
                />
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
                  <span>Registering Account in Firestore...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
