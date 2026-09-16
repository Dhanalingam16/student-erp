'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import { Button } from '@school-erp/ui';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '+91 98765 43210',
    department: 'Mathematics',
    preferredNotifications: 'Email & SMS'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/school');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-200 p-8">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Account Active</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Complete Your Profile Setup</h2>
        <p className="text-xs text-slate-500 mt-1">First time login configuration for {user?.role}.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Department / Role</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Save & Proceed to Dashboard
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
