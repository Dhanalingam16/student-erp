'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { Bell, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TeacherCommunicationPage() {
  const { announcements, addAnnouncement } = useERPStore();
  const [noticeText, setNoticeText] = useState('');
  const [title, setTitle] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !noticeText) return;

    addAnnouncement({
      title,
      content: noticeText,
      category: 'academic',
      targetAudience: 'class_10',
      publishedBy: 'Mrs. Lakshmi Raman (Class Teacher 10-A)',
      priority: 'normal',
    });

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setTitle('');
      setNoticeText('');
    }, 1500);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Class 10-A Parent & Student Notices
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Send targeted academic circulars, test reminders, and homework instructions to Class 10-A parents.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Compose Form */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs text-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Compose Class 10-A Notice</h3>

          {isSent ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-center space-y-1">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto" />
              <p className="font-bold text-emerald-900">Notice Broadcasted Successfully!</p>
              <p className="text-slate-500">Delivered to 36 parent and student app accounts.</p>
            </div>
          ) : (
            <form onSubmit={handlePost} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">Notice Heading</label>
                <input
                  type="text"
                  placeholder="e.g. Mathematics Formula Sheet for Half-Yearly Exam"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Message Content</label>
                <textarea
                  rows={4}
                  placeholder="Type clear instructions for parents and students..."
                  value={noticeText}
                  onChange={(e) => setNoticeText(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="sm" className="w-full">
                <Send className="h-3.5 w-3.5 mr-1" />
                Dispatch to Class 10-A
              </Button>
            </form>
          )}
        </div>

        {/* Existing Notices stream */}
        <div className="md:col-span-2 space-y-3">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Past Notices Dispatched
          </h3>
          {announcements.map((anc) => (
            <div key={anc.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{anc.title}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">By: {anc.publishedBy}</p>
                </div>
                <span className="font-mono text-[10px] text-slate-400">{anc.publishedAt}</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{anc.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
