'use client';

import React from 'react';
import { mockAnnouncements } from '@school-erp/mock-data';
import { Megaphone, Plus, Bell } from 'lucide-react';
import { Button, Badge } from '@school-erp/ui';

export default function CommunicationPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Communication Desk & Circulars</h1>
          <p className="text-xs text-slate-500 mt-1">Publish circulars, emergency announcements & parent notifications</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          New Circular / Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {mockAnnouncements.map(anc => (
          <div key={anc.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-100 text-blue-700"><Megaphone className="w-4 h-4" /></span>
                <h3 className="text-sm font-bold text-slate-900">{anc.title}</h3>
              </div>
              <Badge variant={anc.isImportant ? 'danger' : 'info'}>Target: {anc.targetAudience}</Badge>
            </div>
            <p className="text-xs text-slate-600">{anc.content}</p>
            <p className="text-[10px] text-slate-400">Published by {anc.author} • Category: {anc.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
