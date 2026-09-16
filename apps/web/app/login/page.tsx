'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { DEMO_USERS } from '@school-erp/constants';
import { UserRole } from '@school-erp/types';
import { ShieldCheck, Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import { Button } from '@school-erp/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@stxavier.edu');
  const [password, setPassword] = useState('••••••••••••');
  const { loginAsRole } = useAuthStore();
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsRole('SCHOOL_ADMIN');
    router.push('/school');
  };

  const handleDemoSelect = (role: UserRole) => {
    loginAsRole(role);
    if (role === 'SUPER_ADMIN') router.push('/admin');
    else if (role === 'SCHOOL_ADMIN') router.push('/school');
    else if (role === 'TEACHER') router.push('/teacher');
    else if (role === 'STUDENT') router.push('/student');
    else if (role === 'PARENT') router.push('/parent-mobile');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-900">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Branding Side */}
        <div className="md:col-span-5 bg-slate-900 text-white p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg text-white mb-6">
              S
            </div>
            <h2 className="text-2xl font-bold tracking-tight">SchoolOS Enterprise</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Unified Operating System for Schools, Academics, Parents & Teachers.
            </p>
          </div>

          <div className="my-8 space-y-3">
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="font-semibold text-white block">Multi-Role Architecture</span>
              <span className="text-slate-400">Isolated viewports for Admin, Faculty, Students & Parents.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
              <span className="font-semibold text-white block">Mock Service Contracts</span>
              <span className="text-slate-400">Ready for REST API connection in Phase 2.</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            © 2026 St. Xavier Operating Portal
          </div>
        </div>

        {/* Right Form & Demo Switcher */}
        <div className="md:col-span-7 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Sign in to your account</h3>
            <p className="text-xs text-slate-500 mt-1">Enter credentials or select a Demo Role below for instant access.</p>

            {/* Quick Demo Role Cards */}
            <div className="mt-6 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Accounts (One-Tap Login)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEMO_USERS.map((demo) => (
                  <button
                    key={demo.role}
                    type="button"
                    onClick={() => handleDemoSelect(demo.role as UserRole)}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition-all flex items-center gap-2.5 group"
                  >
                    <img src={demo.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 truncate">{demo.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{demo.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleSignIn} className="space-y-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email / Phone / Student ID</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                  <a href="#" className="text-[11px] text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="remember" defaultChecked className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                <label htmlFor="remember" className="text-xs text-slate-600">Remember this device</label>
              </div>

              <Button type="submit" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Sign In to Dashboard
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
