'use client';

import React from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@school-erp/ui';

export default function TeacherMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">Parent & Student Communication Center</h1>
        <p className="text-xs text-slate-500 mt-1">Direct messaging desk with parents of Grade 10-A students</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
          <p className="text-xs font-bold text-slate-900">Message to Vikram Sharma (Parent of Rahul Sharma)</p>
          <p className="text-xs text-slate-600">"Dear Mr. Sharma, Rahul's attendance is good (91.4%). We recommend extra practice in Polynomials before half-yearly papers."</p>
          <span className="text-[10px] text-slate-400">Sent Today • 10:30 AM</span>
        </div>
      </div>
    </div>
  );
}
