# Vidya Mandir Public School — Enterprise School ERP Platform

A production-quality School ERP platform designed for **Vidya Mandir Public School, New Delhi** (CBSE Affiliated, Affiliation No. 2730419, Academic Session 2026–2027).

This platform delivers **four distinct product experiences** sharing a unified enterprise visual design language, high-density data tables, and realistic Indian educational datasets:

1. **Admin Web Portal** (`/admin`): Desktop-first institutional ERP command center with 18 enterprise modules, operations dashboard, and dense data tables.
2. **Teacher Web Portal** (`/teacher`): Classroom management portal with rapid morning attendance registers, homework distribution, and CBSE marks tabulation.
3. **Parent Mobile App** (`/parent`): Mobile-first companion with prominent multi-child switcher (*Aarav Sharma - 10-A* and *Ananya Sharma - 6-B*), online fee payment with stamped PDF receipts, and live bus GPS route tracking.
4. **Student Mobile App** (`/student`): Daily timetable with active period indicators, downloadable chapter LMS notes, homework submission desk, and digital student ID cards.

---

## 🏛️ Institution & Dataset Profile

- **Institution**: Vidya Mandir Public School, Sector 14, Phase II, Dwarka, New Delhi - 110078
- **Affiliation**: CBSE School Code 71245 • Affiliation No. CBSE/AFF/2730419
- **Academic Session**: 2026–2027 (Active: Term 2)
- **Enrollment**: 1,420 Enrolled Students • 84 Teaching Faculty • 16 Bus Fleet Routes
- **Demo Personas**:
  - **Super Admin**: *Dr. Arvind Swaminathan* (`admin@vidyamandir.edu.in`)
  - **Class Teacher (10-A)**: *Mrs. Lakshmi Raman* (`l.raman@vidyamandir.edu.in`)
  - **Parent Guardian**: *Mr. Rajesh Sharma* (`rajesh.sharma@gmail.com`)
  - **Student**: *Aarav Sharma* (`aarav.sharma@student.vidyamandir.edu.in`)

---

## 🚀 Quick Start Guide

### 1. Launch the Next.js Enterprise Web Platform

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Instant Product Switcher
The top institutional navigation bar features a persistent **Product Switcher**:
- Click **Admin Web** to navigate to `/admin`
- Click **Teacher Web** to navigate to `/teacher`
- Click **Parent App** to navigate to `/parent` (with Child Switcher and Mobile Device Frame toggle)
- Click **Student App** to navigate to `/student` (with Mobile Device Frame toggle)

---

## 📦 Project Architecture

```
school-erp/
│
├── apps/
│   ├── web/                     # Enterprise Next.js 14 Web Portal
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── admin/       # 18 Enterprise Admin Modules
│   │   │   │   ├── teacher/     # Faculty Classroom Workspace
│   │   │   │   ├── parent/      # Multi-Child Parent Mobile Experience
│   │   │   │   ├── student/     # Student Mobile Companion
│   │   │   │   └── login/       # Authentication & Preset Selector
│   │   │   ├── components/      # DataTable, Dialogs, Modals
│   │   │   └── lib/             # Reactive Store & Indian Demo Data
│   │
│   └── mobile/                  # Flutter Client (Dart / Riverpod / GoRouter)
│
├── backend/                     # Python FastAPI Service
│   ├── app/
│   │   ├── main.py              # FastAPI Application & Middleware
│   │   ├── models/              # SQLAlchemy Database Models
│   │   └── schemas/             # Pydantic Schemas
│   └── requirements.txt
│
├── packages/
│   ├── types/                   # Shared TypeScript Interfaces
│   └── constants/               # CBSE Grading Scales & Institution Config
│
└── docs/                        # Architecture & Technical Specifications
```

---

## 🛡️ Enterprise Modules Overview

- **Admin Operational Dashboard**: Real-time attendance counts, today's fee collections, priority exceptions, and fleet status.
- **People Directory**: High-density searchable data tables for Students, Teachers, and Parents with 360° profile inspection.
- **Finance & Fee System**: Annual fee structures, student ledger balances, offline counter receipting with confirmation dialog safeguards, and online checkout with instant receipt generation.
- **Examination & Marks**: CBSE 9-point grading scale (A1 to E), live marks entry validation against max marks, and printable progress report cards.
- **Transport Fleet & GPS**: Fleet registry, driver/attendant KYC, and real-time interactive route map simulation for Route 12 with stop ETAs.
- **Campus Security**: Digital visitor gate pass generator with entry/exit timestamps and active on-campus headcounts.
- **Hostel & Infirmary**: Room and bed visual occupancy grid for Tagore and Shivaji Bhawans, and dispensary medical triage logs.
- **System Admin & RBAC**: Granular permissions matrix across 5 roles and tamper-evident security audit trails.
