import "./globals.css";

export const metadata = {
  title: "SkillGapX – AI-Based Student Skill Verification & Placement Readiness System",
  description: "AI-powered skill verification, gap analysis, and placement readiness prediction platform designed for MCA students and tech aspirants.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0f19] text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
