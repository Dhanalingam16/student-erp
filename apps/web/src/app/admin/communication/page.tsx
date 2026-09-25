'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { Bell, Send, Plus, CheckCircle, MessageSquare, Mail, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';

export default function CommunicationPage() {
  const { announcements, addAnnouncement } = useERPStore();
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'academic' | 'transport' | 'fee' | 'urgent' | 'general'>('academic');
  const [targetAudience, setTargetAudience] = useState<'all' | 'teachers' | 'parents' | 'students' | 'class_10'>('all');
  const [channels, setChannels] = useState<{ inApp: boolean; sms: boolean; whatsapp: boolean }>({
    inApp: true,
    sms: true,
    whatsapp: true,
  });

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    addAnnouncement({
      title,
      content,
      category,
      targetAudience,
      publishedBy: 'School Administration Office',
      priority: category === 'urgent' ? 'critical' : 'normal',
    });

    setIsNewOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-amber-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Omnichannel Communication Hub
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Dispatch announcements via In-App Alerts, SMS DLT Gateway, and WhatsApp Business API.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsNewOpen(true)}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          Compose Broadcast Notice
        </Button>
      </div>

      {/* Gateway Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-blue-50 text-blue-600">
              <Smartphone className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">SMS Gateway (DLT)</p>
              <p className="text-[10px] text-slate-400">Balance: 42,850 SMS Credits</p>
            </div>
          </div>
          <Badge variant="success">Active</Badge>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-emerald-50 text-emerald-600">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">WhatsApp Business</p>
              <p className="text-[10px] text-slate-400">Meta Cloud API Connected</p>
            </div>
          </div>
          <Badge variant="success">Verified</Badge>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-purple-50 text-purple-600">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Email Relay</p>
              <p className="text-[10px] text-slate-400">Amazon SES / DKIM Verified</p>
            </div>
          </div>
          <Badge variant="success">Operational</Badge>
        </div>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-3">
        {announcements.map((anc) => (
          <div
            key={anc.id}
            className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 text-xs"
          >
            <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-100 pb-2.5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{anc.title}</h3>
                  <Badge variant={anc.priority === 'high' || anc.priority === 'critical' ? 'danger' : 'info'}>
                    {anc.category.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Target Audience: <span className="font-semibold uppercase text-slate-700">{anc.targetAudience}</span> •
                  Issued by: {anc.publishedBy}
                </p>
              </div>

              <span className="font-mono text-slate-500 text-[11px]">{anc.publishedAt}</span>
            </div>

            <p className="text-slate-700 leading-relaxed text-xs">{anc.content}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 font-medium">✓ In-App Sent</span>
                <span className="text-emerald-700 font-medium">✓ SMS Dispatched</span>
                <span className="text-emerald-700 font-medium">✓ WhatsApp Delivered</span>
              </div>
              <span className="font-mono text-slate-400">100% Delivery Rate</span>
            </div>
          </div>
        ))}
      </div>

      {/* Compose Notice Modal */}
      <Dialog
        isOpen={isNewOpen}
        onClose={() => setIsNewOpen(false)}
        title="Compose Broadcast Announcement"
        description="Broadcast circulars, date-sheet schedules, transport advisories, or fee reminders across school channels."
        maxWidth="lg"
      >
        <form onSubmit={handleBroadcast} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-800 block mb-1">Announcement Title</label>
            <input
              type="text"
              placeholder="e.g. Mandatory Parent-Teacher Meeting (PTM) Schedule"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              >
                <option value="academic">Academic & Exams</option>
                <option value="fee">Fee & Accounts</option>
                <option value="transport">Transport Advisory</option>
                <option value="urgent">Urgent Circular</option>
                <option value="general">General Institution News</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              >
                <option value="all">Entire Institution (All Stakeholders)</option>
                <option value="parents">All Parents</option>
                <option value="students">All Students</option>
                <option value="teachers">Teaching Staff</option>
                <option value="class_10">Class 10 Parents & Students</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-800 block mb-1">Message Body</label>
            <textarea
              rows={4}
              placeholder="Type full official announcement text..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              required
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
            <span className="font-semibold text-slate-700 block text-[11px]">Dispatch Channels</span>
            <div className="flex gap-4 text-slate-700">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channels.inApp}
                  onChange={(e) => setChannels({ ...channels, inApp: e.target.checked })}
                />
                In-App Push
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channels.sms}
                  onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                />
                SMS Gateway
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={channels.whatsapp}
                  onChange={(e) => setChannels({ ...channels, whatsapp: e.target.checked })}
                />
                WhatsApp API
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsNewOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              <Send className="h-3.5 w-3.5 mr-1" />
              Broadcast Instantly
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
