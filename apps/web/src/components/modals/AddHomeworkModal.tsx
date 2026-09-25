'use client';

import React, { useState } from 'react';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { useERPStore } from '@/lib/store';
import { BookOpen, Upload, Calendar } from 'lucide-react';
import { SUBJECTS_CLASS_10, SCHOOL_CLASSES } from '@/lib/constants';

interface AddHomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClassSection?: string;
}

export function AddHomeworkModal({
  isOpen,
  onClose,
  defaultClassSection = '10-A',
}: AddHomeworkModalProps) {
  const { addHomework, currentUser } = useERPStore();
  const [classSection, setClassSection] = useState(defaultClassSection);
  const [subject, setSubject] = useState(SUBJECTS_CLASS_10[0].name);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-09-28');
  const [attachmentName, setAttachmentName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addHomework({
      title,
      description,
      classSection,
      subject,
      teacherName: currentUser.name || 'Mrs. Lakshmi Raman',
      assignedDate: '2026-09-25',
      dueDate,
      attachments: attachmentName ? [attachmentName] : undefined,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setTitle('');
      setDescription('');
      setAttachmentName('');
      onClose();
    }, 1000);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Homework / Assignment"
      description="Post classroom homework directly to students and parents with guidelines and deadlines."
      maxWidth="lg"
    >
      {isSuccess ? (
        <div className="py-6 text-center text-xs space-y-1">
          <p className="font-semibold text-emerald-700 text-sm">Homework Posted Successfully!</p>
          <p className="text-slate-500">Notifications sent to Class {classSection} students and parents.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Target Class</label>
              <select
                value={classSection}
                onChange={(e) => setClassSection(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              >
                {SCHOOL_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    Class {c.id} ({c.stream})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              >
                {SUBJECTS_CLASS_10.map((s) => (
                  <option key={s.code} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-800 block mb-1">Homework Title / Chapter</label>
            <input
              type="text"
              placeholder="e.g. Chapter 9: Heights & Distances - Exercise 9.1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-800 block mb-1">Instructions & Problem Numbers</label>
            <textarea
              rows={3}
              placeholder="Specify questions from textbook, formatting requirements, and guidelines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Submission Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Attach Worksheet / File</label>
              <input
                type="text"
                placeholder="e.g. Heights_Distances_Practice.pdf"
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Post Homework
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
