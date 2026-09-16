import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, GraduationCap, Users, Smartphone, BarChart3, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-sm">
            S
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">SchoolOS ERP</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs font-semibold text-slate-700 hover:text-slate-900">
            Sign In
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Launch Demo Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-8 max-w-5xl mx-auto text-center flex-1 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
          <span>Enterprise School Operating System • Built for 5,000+ Students</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          A Modern Operating Platform for Today's Institutions
        </h1>

        <p className="mt-4 text-base text-slate-600 max-w-2xl leading-relaxed">
          Unifying School Administration, Academics, Attendance, Fees, Examinations, Transport, Parent Mobile Apps, and AI Insights into one clean, reliable operating system.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <span>Explore All 5 Role Portals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/school"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-800 border border-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-xs"
          >
            Open School Command Center
          </Link>
        </div>

        {/* Core Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="p-2 bg-slate-100 rounded-lg w-fit text-slate-800 mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">School Command Center</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Real-time attendance metrics, fee collection velocity, attention required alerts, and student 360° views.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="p-2 bg-slate-100 rounded-lg w-fit text-slate-800 mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Teacher Classroom Hub</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              One-tap visual attendance marking (Present/Absent/Late), assignment submission evaluations, and marks entry.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
            <div className="p-2 bg-slate-100 rounded-lg w-fit text-slate-800 mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Parent & Student Mobile Apps</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Multi-child switcher, real-time fee receipt generation, academic result breakdowns, and study recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-8 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© 2026 SchoolOS Enterprise ERP. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/login" className="hover:text-slate-900">Demo Login</Link>
            <Link href="/school" className="hover:text-slate-900">Command Center</Link>
            <Link href="/admin" className="hover:text-slate-900">Super Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
