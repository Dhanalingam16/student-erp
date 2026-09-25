'use client';

import React from 'react';
import Link from 'next/link';
import { useERPStore } from '@/lib/store';
import {
  ShieldAlert,
  GraduationCap,
  Users,
  User,
  ArrowRight,
  CheckCircle2,
  Building2,
  Calendar,
  Bus,
  CreditCard,
  BookOpen,
  Award,
} from 'lucide-react';
import { INSTITUTION_INFO, DEMO_PRESET_USERS } from '@/lib/constants';

export default function HomePage() {
  const { switchRole } = useERPStore();

  const productCards = [
    {
      title: 'Admin Web Portal',
      target: '/admin',
      role: 'super_admin' as const,
      userPreset: DEMO_PRESET_USERS[0],
      icon: <ShieldAlert className="h-6 w-6 text-blue-600" />,
      platform: 'Desktop / Tablet / Responsive Web',
      description:
        'Comprehensive institutional ERP. Manage 18 modules including Admissions CRM, Academics, Examination & CBSE Grading, Multi-tier Fees, Live Transport GPS, Security Passes, and Clinic Logs.',
      features: [
        'Real-time Operational Dashboard',
        'CBSE Tabulation & Report Card Generator',
        'Fee Structures & Offline Cash/Cheque Collection',
        'Live Bus Fleet Tracking & Stop ETA',
      ],
      badge: 'Enterprise ERP',
      cta: 'Launch Admin Portal',
    },
    {
      title: 'Teacher Web Portal',
      target: '/teacher',
      role: 'teacher' as const,
      userPreset: DEMO_PRESET_USERS[1],
      icon: <GraduationCap className="h-6 w-6 text-emerald-600" />,
      platform: 'Desktop / Tablet Web',
      description:
        'Designed specifically for classroom educators. 1-click attendance entry, homework assignment with attachments, exam marks entry with grade boundaries, and parent communication.',
      features: [
        'Rapid Class 10-A Morning Attendance Register',
        'Homework Distribution & Submissions Review',
        'Exam Marks Tabulation with Max-Marks Limits',
        'Today’s Period-by-Period Teaching Schedule',
      ],
      badge: 'Classroom Operations',
      cta: 'Launch Teacher Portal',
    },
    {
      title: 'Parent Mobile App',
      target: '/parent',
      role: 'parent' as const,
      userPreset: DEMO_PRESET_USERS[2],
      icon: <Users className="h-6 w-6 text-amber-600" />,
      platform: 'Android / iOS (Mobile App)',
      description:
        'Tailored for parents with multiple children. Seamlessly switch between Aarav (Class 10-A) and Ananya (Class 6-B). Pay pending fees with instant receipts and track the school bus live.',
      features: [
        'Prominent Multi-Child Switcher',
        'Online Fee Payment (UPI/Card) & PDF Receipts',
        'Route 12 Live Bus GPS Tracker with Stop ETA',
        'Monthly Attendance Calendar & Teacher Remarks',
      ],
      badge: 'Parent Experience',
      cta: 'Launch Parent App',
    },
    {
      title: 'Student Mobile App',
      target: '/student',
      role: 'student' as const,
      userPreset: DEMO_PRESET_USERS[3],
      icon: <User className="h-6 w-6 text-purple-600" />,
      platform: 'Android / iOS (Mobile App)',
      description:
        'Compact daily companion for students. View today’s timetable with current period indicator, pending homework, chapter LMS study materials, exam countdown, and report cards.',
      features: [
        'Today’s Timetable with Room & Teacher Details',
        'Chapter Notes & Study Material Downloads',
        'Homework Submission & Teacher Feedback',
        'CBSE Term Marks & Progress Reports',
      ],
      badge: 'Student Experience',
      cta: 'Launch Student App',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Institutional Hero Banner */}
      <div className="bg-navy-950 text-white rounded-lg p-6 sm:p-8 shadow-sm border border-navy-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-amber-500 text-navy-950 font-black text-xl flex items-center justify-center shadow-md">
              VM
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {INSTITUTION_INFO.name}
              </h1>
              <p className="text-xs sm:text-sm text-navy-200">
                {INSTITUTION_INFO.tagline} • Affiliation: {INSTITUTION_INFO.affiliationNo}
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="inline-block px-2.5 py-1 bg-navy-800 border border-navy-700 text-navy-200 rounded font-mono font-medium">
              Academic Session {INSTITUTION_INFO.academicSession}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
          <div>
            <p className="text-navy-400">Total Enrolled</p>
            <p className="text-lg font-bold font-mono text-white">1,420 Students</p>
          </div>
          <div>
            <p className="text-navy-400">Teaching Faculty</p>
            <p className="text-lg font-bold font-mono text-white">84 Teachers</p>
          </div>
          <div>
            <p className="text-navy-400">Transport Fleet</p>
            <p className="text-lg font-bold font-mono text-white">16 Bus Routes</p>
          </div>
          <div>
            <p className="text-navy-400">Campus Status</p>
            <p className="text-lg font-bold font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Operations Active
            </p>
          </div>
        </div>
      </div>

      {/* 4 Products Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Select Product Portal</h2>
          <p className="text-xs text-slate-500">
            Each portal provides a dedicated user experience, navigation hierarchy, and tailored workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productCards.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">{p.icon}</div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                      <p className="text-[11px] text-slate-500">{p.platform}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {p.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>

                {/* Features List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {p.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Persona Profile */}
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
                    Demo Account:
                  </span>
                  <div className="flex justify-between items-center text-slate-800">
                    <span className="font-semibold">{p.userPreset.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{p.userPreset.email}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2">
                <Link
                  href={p.target}
                  onClick={() => switchRole(p.role)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded bg-navy-900 text-white font-medium text-xs hover:bg-navy-800 transition-colors shadow-xs"
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
