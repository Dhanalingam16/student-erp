# School ERP — Enterprise Frontend Ecosystem

A production-quality frontend monorepo for a modern School Operating System built with Next.js 14, React Native / Expo components, Tailwind CSS, Turborepo, TypeScript, Zod, React Hook Form, and Zustand.

## Overview

Covering 5 User Roles across Web & Mobile:
- **Super Admin**: System governance, multi-school management, audit logs, analytics.
- **School Admin**: School Command Center, Student 360° View, Admissions CRM, Academics, Finance, Transport, Hostel, Library, Health, HR, Events, Certificates.
- **Teacher**: Web dashboard, classroom attendance marking grid (Present/Absent/Late), assignment evaluations, marks entry, timetable.
- **Student**: Daily schedule, assignment submissions, digital study materials, performance analytics, timetable.
- **Parent (Mobile-First)**: Multi-child switcher (Rahul / Ananya), real-time attendance, fee payment receipts, school announcements, teacher updates.

## Architecture

```text
school-erp/
├── apps/
│   ├── web/               # Next.js App Router Web Application (All Web Portals)
│   ├── student-mobile/    # Student Mobile Application Layout & Viewport
│   ├── teacher-mobile/    # Teacher Mobile Application Layout & Viewport
│   └── parent-mobile/     # Parent Mobile Application (Mobile-Only)
└── packages/
    ├── design-tokens/     # Visual palette, spacing, typography tokens
    ├── types/             # Shared TypeScript models and interfaces
    ├── constants/         # System enums, roles, navigation maps
    ├── mock-data/         # Realistic 5,000-student school datasets
    ├── validation/        # Zod validation schemas
    ├── utils/             # Formatters, grade calculators, math helpers
    └── ui/                # Shared UI component library
```
