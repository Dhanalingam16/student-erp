'use client';

import React, { useState } from 'react';
import { mockStudents, mockAssignments } from '@school-erp/mock-data';
import { Badge } from '@school-erp/ui';
import { Home, BookOpen, CheckSquare, Award, User, Clock, Sparkles } from 'lucide-react';

export default function StudentMobileViewportPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'classes' | 'tasks' | 'results' | 'profile'>('home');
  const student = mockStudents[0];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      {/* Mobile Device Frame */}
      <div className="w-full max-w-sm h-[780px] bg-slate-50 rounded-[40px] shadow-2xl border-[8px] border-slate-800 flex flex-col overflow-hidden relative">
        {/* Notch & Status */}
        <div className="h-10 bg-slate-900 text-white px-6 flex items-center justify-between text-[11px] font-medium shrink-0">
          <span>09:41</span>
          <div className="w-16 h-4 bg-black rounded-full" />
          <span>5G 100%</span>
        </div>

        {/* Student Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center gap-3 shrink-0 border-b border-slate-800">
          <img src={student.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500" />
          <div>
            <h2 className="text-sm font-bold">{student.name}</h2>
            <p className="text-[11px] text-slate-400">{student.className}-{student.section} • Roll #{student.rollNo} • STU-1024</p>
          </div>
        </div>

        {/* Viewport Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'home' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-400">Daily Overview</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">Attendance</span>
                    <span className="text-lg font-bold text-slate-900">{student.attendancePercentage}%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">Academic Score</span>
                    <span className="text-lg font-bold text-slate-900">{student.academicScore}%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-xs font-bold text-slate-900">Today's Class Schedule</h3>
                <div className="text-xs space-y-2 text-slate-600">
                  <p className="p-2 bg-slate-50 rounded">09:00 AM — Mathematics (Priya Sundaram)</p>
                  <p className="p-2 bg-slate-50 rounded">10:00 AM — Physics (Dr. Amit Gupta)</p>
                  <p className="p-2 bg-slate-50 rounded">11:30 AM — English Literature</p>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-1 text-xs">
                <span className="text-[10px] font-bold text-indigo-700 uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Study Tip
                </span>
                <p className="font-semibold text-slate-900">Physics Exam Preparation</p>
                <p className="text-[11px] text-slate-600">Review Electromagnetic Induction lab notes before Friday's paper.</p>
              </div>
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="space-y-3 animate-in fade-in duration-150 text-xs">
              <h3 className="font-bold text-slate-900">Enrolled Subjects</h3>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">Mathematics</p>
                <p className="text-slate-500">Teacher: Priya Sundaram • Room 204</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">Physics</p>
                <p className="text-slate-500">Teacher: Dr. Amit Gupta • Lab 2</p>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-3 animate-in fade-in duration-150 text-xs">
              <h3 className="font-bold text-slate-900">Pending Homework Tasks</h3>
              {mockAssignments.map(a => (
                <div key={a.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">{a.title}</p>
                  <p className="text-slate-500">{a.subject} • Due: {a.dueDate}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-3 animate-in fade-in duration-150 text-xs">
              <h3 className="font-bold text-slate-900">Term 1 Results Summary</h3>
              <div className="p-4 bg-slate-900 text-white rounded-xl">
                <p className="text-lg font-bold">Aggregate: 420/500 (84%)</p>
                <p className="text-slate-400">Class Rank: #4</p>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-3 animate-in fade-in duration-150 text-xs">
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Digital Student ID</p>
                <p>ID: STU-1024</p>
                <p>Guardian: Vikram Sharma (+91 98765 43210)</p>
                <p>Blood Group: O+</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tab Navigation */}
        <div className="h-16 bg-white border-t border-slate-200 grid grid-cols-5 items-center shrink-0 px-2">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${activeTab === 'home' ? 'text-slate-900' : 'text-slate-400'}`}>
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button onClick={() => setActiveTab('classes')} className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${activeTab === 'classes' ? 'text-slate-900' : 'text-slate-400'}`}>
            <BookOpen className="w-4 h-4" />
            <span>Classes</span>
          </button>

          <button onClick={() => setActiveTab('tasks')} className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${activeTab === 'tasks' ? 'text-slate-900' : 'text-slate-400'}`}>
            <CheckSquare className="w-4 h-4" />
            <span>Tasks</span>
          </button>

          <button onClick={() => setActiveTab('results')} className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${activeTab === 'results' ? 'text-slate-900' : 'text-slate-400'}`}>
            <Award className="w-4 h-4" />
            <span>Results</span>
          </button>

          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${activeTab === 'profile' ? 'text-slate-900' : 'text-slate-400'}`}>
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
