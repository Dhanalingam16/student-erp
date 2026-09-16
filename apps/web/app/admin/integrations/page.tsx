'use client';

import React from 'react';
import { Cpu } from 'lucide-react';
import { Badge, Button } from '@school-erp/ui';

export default function AdminIntegrationsPage() {
  const integrations = [
    { name: 'FastAPI Backend API (Phase 2)', category: 'Core Backend', status: 'Ready for Connection' },
    { name: 'Razorpay / Payment Gateway', category: 'Finance', status: 'Mocked (Phase 1)' },
    { name: 'WhatsApp Business API', category: 'Messaging', status: 'Mocked (Phase 1)' },
    { name: 'Twilio SMS Gateway', category: 'SMS Alerts', status: 'Mocked (Phase 1)' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">Platform Integrations Registry</h1>
        <p className="text-xs text-slate-500 mt-1">Decoupled mock integration contracts for future production services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((ing, i) => (
          <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">{ing.name}</h3>
              <Badge variant="info">{ing.status}</Badge>
            </div>
            <p className="text-xs text-slate-500">Category: {ing.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
