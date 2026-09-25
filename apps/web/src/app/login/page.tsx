'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useERPStore } from '@/lib/store';
import { INSTITUTION_INFO, DEMO_PRESET_USERS } from '@/lib/constants';
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RoleType } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole } = useERPStore();
  const [selectedPreset, setSelectedPreset] = useState<RoleType>('super_admin');
  const [email, setEmail] = useState('admin@vidyamandir.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [otpRequired, setOtpRequired] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePresetSelect = (role: RoleType) => {
    setSelectedPreset(role);
    const user = DEMO_PRESET_USERS.find((u) => u.role === role);
    if (user) {
      setEmail(user.email);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      switchRole(selectedPreset);
      setIsLoading(false);

      if (selectedPreset === 'super_admin') {
        router.push('/admin');
      } else if (selectedPreset === 'teacher') {
        router.push('/teacher');
      } else if (selectedPreset === 'parent') {
        router.push('/parent');
      } else {
        router.push('/student');
      }
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-50 min-h-[calc(100vh-41px)]">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
        {/* Institutional Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-navy-950 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-sm">
            VM
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 tracking-tight">
              {INSTITUTION_INFO.name}
            </h1>
            <p className="text-xs text-slate-500">
              Enterprise Unified Education Portal • CBSE #{INSTITUTION_INFO.affiliationNo.split('/')[2]}
            </p>
          </div>
        </div>

        {/* 1-Click Role Switcher Presets */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Select Role Preset
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {DEMO_PRESET_USERS.map((p) => (
              <button
                key={p.role}
                type="button"
                onClick={() => handlePresetSelect(p.role)}
                className={`p-2 rounded border text-left transition-all ${
                  selectedPreset === p.role
                    ? 'border-navy-950 bg-navy-50 font-bold text-navy-950 ring-1 ring-navy-950'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="block truncate font-semibold">{p.name.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-500 capitalize block">{p.role.replace('_', ' ')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-800 block mb-1">Institutional Email / User ID</label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded text-xs bg-slate-50 focus:bg-white focus:ring-1 focus:ring-navy-600 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-800">Password</label>
              <span className="text-[11px] text-navy-800 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded text-xs bg-slate-50 focus:bg-white focus:ring-1 focus:ring-navy-600"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full text-xs font-bold" isLoading={isLoading}>
            <span>Authenticate & Access ERP</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-center text-[11px] text-slate-400">
          <span>Protected by Institutional Hardware MFA & 256-bit TLS Encryption.</span>
        </div>
      </div>
    </div>
  );
}
