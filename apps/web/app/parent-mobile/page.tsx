'use client';

import React, { useState } from 'react';
import { mockStudents, mockFeeLedgers, mockAnnouncements } from '@school-erp/mock-data';
import { Badge, Button, Modal } from '@school-erp/ui';
import {
  Home, Users, Bell, CreditCard, User, ChevronRight, CheckCircle,
  AlertTriangle, Smartphone, Download, Plus, ArrowRight, ShieldCheck, HeartPulse
} from 'lucide-react';

export default function ParentMobileAppPage() {
  const [activeTab, setActiveTab] = useState<'home' | 'children' | 'updates' | 'payments' | 'profile'>('home');
  const [selectedChildIndex, setSelectedChildIndex] = useState(0); // 0 = Rahul (10-A), 1 = Ananya (6-B)
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const childrenList = [mockStudents[0], mockStudents[1]]; // Rahul & Ananya
  const activeChild = childrenList[selectedChildIndex];
  const feeLedger = mockFeeLedgers[selectedChildIndex] || mockFeeLedgers[0];

  const handlePayFee = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setIsPayModalOpen(false);
      feeLedger.dueAmount = 0;
      feeLedger.status = 'Paid';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans antialiased text-slate-900">
      {/* Phone Viewport Device Frame */}
      <div className="w-full max-w-sm h-[780px] bg-slate-50 rounded-[40px] shadow-2xl border-[8px] border-slate-800 flex flex-col overflow-hidden relative">
        {/* Phone Notch & Status Bar */}
        <div className="h-10 bg-slate-900 text-white px-6 flex items-center justify-between text-[11px] font-medium shrink-0">
          <span>09:41</span>
          <div className="w-16 h-4 bg-black rounded-full" />
          <span>5G 100%</span>
        </div>

        {/* Child Profile Switcher Banner Header */}
        <div className="bg-slate-900 text-white p-4 shrink-0 space-y-2 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Parent Mobile Portal</span>
            <span className="text-[10px] text-slate-400">2 Children Enrolled</span>
          </div>

          {/* Child Switcher Cards */}
          <div className="flex gap-2 pt-1">
            {childrenList.map((child, idx) => {
              const isSelected = idx === selectedChildIndex;
              return (
                <button
                  key={child.id}
                  onClick={() => setSelectedChildIndex(idx)}
                  className={`flex-1 p-2 rounded-lg text-left transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-slate-800 border-blue-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <img src={child.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate leading-tight">{child.name.split(' ')[0]}</p>
                    <p className="text-[10px] truncate text-slate-400">{child.className}-{child.section}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Viewport Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Daily Overview Card */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">{activeChild.name}</h2>
                    <p className="text-[11px] text-slate-500">{activeChild.className} Section {activeChild.section} • Roll #{activeChild.rollNo}</p>
                  </div>
                  <Badge variant="success">Present Today</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Attendance</span>
                    <span className="text-base font-bold text-slate-900">{activeChild.attendancePercentage}%</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Academic Score</span>
                    <span className="text-base font-bold text-slate-900">{activeChild.academicScore}%</span>
                  </div>
                </div>
              </div>

              {/* Fee Alert Card */}
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-700" /> Quarter 2 Term Fees
                  </span>
                  <Badge variant={feeLedger.dueAmount > 0 ? 'warning' : 'success'}>
                    {feeLedger.dueAmount > 0 ? `₹${feeLedger.dueAmount.toLocaleString()} Pending` : 'Paid'}
                  </Badge>
                </div>
                <p className="text-[11px] text-amber-800">Due Date: {feeLedger.dueDate}</p>
                {feeLedger.dueAmount > 0 && (
                  <button
                    onClick={() => setIsPayModalOpen(true)}
                    className="w-full py-2 bg-amber-900 text-white rounded-xl text-xs font-semibold hover:bg-amber-950 transition-colors shadow-xs"
                  >
                    Pay Term Fee (₹{feeLedger.dueAmount.toLocaleString()})
                  </button>
                )}
              </div>

              {/* Parent AI Child Insight Card */}
              <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Parent AI Insight</span>
                <p className="font-semibold text-slate-900">{activeChild.name.split(' ')[0]}'s Progress Summary</p>
                <p className="text-[11px] text-slate-600">
                  Attendance is good at {activeChild.attendancePercentage}%. Science & Physics performance are top tier (89%). English declined slightly.
                </p>
              </div>
            </div>
          )}

          {/* CHILDREN TAB */}
          {activeTab === 'children' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-sm font-bold text-slate-900">Child 360° Mobile Summary</h3>
              {childrenList.map((child) => (
                <div key={child.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={child.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{child.name}</p>
                      <p className="text-[10px] text-slate-500">{child.className} - {child.section} • Roll #{child.rollNo}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-600">
                    <span>Attendance: <strong className="text-slate-900">{child.attendancePercentage}%</strong></span>
                    <span>Score: <strong className="text-slate-900">{child.academicScore}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* UPDATES TAB */}
          {activeTab === 'updates' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="text-sm font-bold text-slate-900">School Notices & PTMs</h3>
              {mockAnnouncements.map(anc => (
                <div key={anc.id} className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1 text-xs">
                  <p className="font-bold text-slate-900">{anc.title}</p>
                  <p className="text-[11px] text-slate-500">{anc.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="text-sm font-bold text-slate-900">Payment History & Receipts</h3>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Quarter 1 Tuition Fee</span>
                  <span className="text-emerald-600 font-bold">Paid ₹11,250</span>
                </div>
                <p className="text-[10px] text-slate-400">Receipt #RCP-2026-089 • 10 July 2026</p>
                <button className="w-full mt-1 py-1.5 border border-slate-300 text-slate-700 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-slate-500" /> Download PDF Receipt
                </button>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-4 animate-in fade-in duration-150 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="font-bold text-slate-900">Parent Details</h3>
                <p>Name: <strong className="text-slate-900">Vikram Sharma</strong></p>
                <p>Phone: <strong className="text-slate-900">+91 98765 43210</strong></p>
                <p>Email: vikram.sharma@gmail.com</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <div className="h-16 bg-white border-t border-slate-200 grid grid-cols-5 items-center shrink-0 px-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${
              activeTab === 'home' ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('children')}
            className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${
              activeTab === 'children' ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Children</span>
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${
              activeTab === 'updates' ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Updates</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${
              activeTab === 'payments' ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center text-[10px] font-semibold gap-1 ${
              activeTab === 'profile' ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>
      </div>

      {/* Mock Payment Modal */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title="Mock Fee Payment (UPI / Net Banking)"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">Pay Quarter 2 Fee for <strong className="text-slate-900">{activeChild.name}</strong></p>
          <div className="p-3 bg-slate-50 rounded-lg flex justify-between font-bold text-slate-900 text-sm">
            <span>Amount Due:</span>
            <span>₹{feeLedger.dueAmount.toLocaleString()}</span>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-slate-700">Select Payment Method</label>
            <div className="p-2.5 border border-slate-300 rounded-lg flex items-center justify-between">
              <span>UPI / GPay / PhonePe</span>
              <input type="radio" name="pay" defaultChecked />
            </div>
            <div className="p-2.5 border border-slate-300 rounded-lg flex items-center justify-between">
              <span>Credit / Debit Card</span>
              <input type="radio" name="pay" />
            </div>
          </div>

          {paymentSuccess ? (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg font-bold text-center flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" /> Payment Successful! Generating Receipt...
            </div>
          ) : (
            <Button variant="primary" className="w-full" onClick={handlePayFee}>
              Confirm & Pay ₹{feeLedger.dueAmount.toLocaleString()}
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}
