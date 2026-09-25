'use client';

import React, { useState } from 'react';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { useERPStore } from '@/lib/store';
import { Shield, Printer, CheckCircle } from 'lucide-react';
import { VisitorPass } from '@/types';
import { INSTITUTION_INFO } from '@/lib/constants';

interface VisitorPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VisitorPassModal({ isOpen, onClose }: VisitorPassModalProps) {
  const { createVisitorPass } = useERPStore();
  const [visitorName, setVisitorName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [meetingPerson, setMeetingPerson] = useState('Principal / School Admin');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [createdPass, setCreatedPass] = useState<VisitorPass | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !phone || !purpose) return;

    const pass = createVisitorPass({
      visitorName,
      phone,
      purpose,
      meetingPerson,
      vehicleNumber: vehicleNumber || undefined,
    });
    setCreatedPass(pass);
  };

  const handleClose = () => {
    setCreatedPass(null);
    setVisitorName('');
    setPhone('');
    setPurpose('');
    setVehicleNumber('');
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={createdPass ? 'Official Gate Visitor Pass' : 'Gate Register: New Visitor Entry'}
      description={
        createdPass
          ? 'Digital security entry badge generated. Visitor must wear this badge visibly while on campus.'
          : 'Log campus entry for parent, vendor, or official inspector.'
      }
      maxWidth={createdPass ? 'md' : 'lg'}
    >
      {createdPass ? (
        <div className="space-y-4 text-xs">
          {/* Digital Badge Card */}
          <div className="border-2 border-navy-900 rounded-lg p-5 bg-white shadow-md text-center space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <span className="font-bold text-sm uppercase text-navy-950 tracking-wider">
                {INSTITUTION_INFO.name}
              </span>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold text-rose-700">
                ★ VISITOR PASS — CAMPUS ENTRY ★
              </p>
            </div>

            <div className="py-2">
              <span className="font-mono text-xl font-extrabold text-navy-900 bg-slate-100 px-3 py-1 rounded border border-slate-300">
                {createdPass.passNumber}
              </span>
            </div>

            <div className="text-left space-y-1.5 bg-slate-50 p-3 rounded border border-slate-200 text-slate-800">
              <p>
                <span className="text-slate-500">Visitor:</span>{' '}
                <span className="font-bold text-slate-900">{createdPass.visitorName}</span>
              </p>
              <p>
                <span className="text-slate-500">Contact:</span>{' '}
                <span className="font-mono font-medium">{createdPass.phone}</span>
              </p>
              <p>
                <span className="text-slate-500">Meeting:</span>{' '}
                <span className="font-medium text-slate-900">{createdPass.meetingPerson}</span>
              </p>
              <p>
                <span className="text-slate-500">Purpose:</span> {createdPass.purpose}
              </p>
              {createdPass.vehicleNumber && (
                <p>
                  <span className="text-slate-500">Vehicle:</span>{' '}
                  <span className="font-mono">{createdPass.vehicleNumber}</span>
                </p>
              )}
              <p>
                <span className="text-slate-500">Entry Time:</span>{' '}
                <span className="font-mono font-bold text-emerald-800">{createdPass.entryTime}</span>
              </p>
            </div>

            <p className="text-[10px] text-slate-400 italic">
              Please return this pass to Security Gate 1 before exiting the school campus.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-3.5 w-3.5 mr-1" />
              Print Pass
            </Button>
            <Button variant="primary" size="sm" onClick={handleClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Visitor Full Name</label>
              <input
                type="text"
                placeholder="e.g. Mr. Rajesh Khanna"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Mobile Phone Number</label>
              <input
                type="tel"
                placeholder="e.g. +91 98110 55432"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800 font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Meeting Person / Office</label>
              <select
                value={meetingPerson}
                onChange={(e) => setMeetingPerson(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              >
                <option value="Principal Dr. Arvind Swaminathan">Principal Office</option>
                <option value="Accounts & Fee Counter">Accounts Office</option>
                <option value="Class Teacher Mrs. Lakshmi Raman (10-A)">Class Teacher 10-A</option>
                <option value="Admissions Desk">Admissions Cell</option>
                <option value="Transport Department">Transport In-charge</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Vehicle Registration (Optional)</label>
              <input
                type="text"
                placeholder="e.g. DL-09-CQ-4190"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800 font-mono uppercase"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-800 block mb-1">Purpose of Visit</label>
            <input
              type="text"
              placeholder="e.g. Discuss Term 2 progress with Class Teacher"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              <Shield className="h-3.5 w-3.5 mr-1" />
              Generate Gate Pass
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
