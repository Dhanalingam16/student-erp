export const APP_NAME = 'SchoolOS ERP';
export const APP_TAGLINE = 'Enterprise School Operating System';

export const NAV_GROUPS_SCHOOL_ADMIN = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Command Center', href: '/school', icon: 'LayoutDashboard' },
    ]
  },
  {
    title: 'ACADEMICS',
    items: [
      { label: 'Students Directory', href: '/school/students', icon: 'Users' },
      { label: 'Classes & Sections', href: '/school/academics', icon: 'GraduationCap' },
      { label: 'Attendance Hub', href: '/school/attendance', icon: 'CalendarCheck' },
      { label: 'Examinations', href: '/school/examinations', icon: 'FileSpreadsheet' },
    ]
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Admissions CRM', href: '/school/admissions', icon: 'UserPlus' },
      { label: 'Transport Fleet', href: '/school/transport', icon: 'Bus' },
      { label: 'Hostel Management', href: '/school/hostel', icon: 'Building2' },
      { label: 'Library Catalog', href: '/school/library', icon: 'BookOpen' },
      { label: 'Health & Clinic', href: '/school/health', icon: 'HeartPulse' },
    ]
  },
  {
    title: 'FINANCE',
    items: [
      { label: 'Fees & Ledger', href: '/school/finance', icon: 'Receipt' },
    ]
  },
  {
    title: 'PEOPLE',
    items: [
      { label: 'Teachers & Staff', href: '/school/teachers', icon: 'Briefcase' },
    ]
  },
  {
    title: 'COMMUNICATION',
    items: [
      { label: 'Announcements', href: '/school/communication', icon: 'Megaphone' },
      { label: 'School Events', href: '/school/events', icon: 'CalendarDays' },
    ]
  },
  {
    title: 'DOCUMENTS',
    items: [
      { label: 'Certificates Suite', href: '/school/certificates', icon: 'Award' },
    ]
  },
  {
    title: 'INSIGHTS & SYSTEM',
    items: [
      { label: 'Analytics Centre', href: '/school/analytics', icon: 'BarChart3' },
      { label: 'School Settings', href: '/school/settings', icon: 'Settings' },
    ]
  }
];

export const NAV_SUPER_ADMIN = [
  { label: 'Overview', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Schools Directory', href: '/admin/schools', icon: 'Building' },
  { label: 'Global Users', href: '/admin/users', icon: 'Users' },
  { label: 'Roles & Permissions', href: '/admin/roles', icon: 'ShieldCheck' },
  { label: 'System Settings', href: '/admin/settings', icon: 'Sliders' },
  { label: 'Integrations', href: '/admin/integrations', icon: 'Cpu' },
  { label: 'Security & Audit Logs', href: '/admin/audit-logs', icon: 'Lock' },
  { label: 'Platform Analytics', href: '/admin/analytics', icon: 'LineChart' },
];

export const NAV_TEACHER = [
  { label: 'Dashboard', href: '/teacher', icon: 'LayoutDashboard' },
  { label: 'My Classes', href: '/teacher/classes', icon: 'GraduationCap' },
  { label: 'Attendance', href: '/teacher/attendance', icon: 'CheckSquare' },
  { label: 'Assignments', href: '/teacher/assignments', icon: 'BookCheck' },
  { label: 'Marks Entry', href: '/teacher/marks', icon: 'FilePenLine' },
  { label: 'Timetable', href: '/teacher/timetable', icon: 'Clock' },
  { label: 'Messages', href: '/teacher/messages', icon: 'MessageSquare' },
];

export const DEMO_USERS = [
  {
    role: 'SUPER_ADMIN',
    name: 'Super Admin',
    email: 'superadmin@schoolos.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'System Governance & Multi-tenant Admin'
  },
  {
    role: 'SCHOOL_ADMIN',
    name: 'Dr. Rajesh Sharma',
    email: 'admin@stxavier.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    description: 'Principal / School Administrator'
  },
  {
    role: 'TEACHER',
    name: 'Priya Sundaram',
    email: 'priya.s@stxavier.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    description: 'Grade 10 Mathematics Teacher'
  },
  {
    role: 'STUDENT',
    name: 'Rahul Sharma (Mobile App)',
    email: 'rahul.s10@stxavier.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    description: 'Student Mobile Application'
  },
  {
    role: 'PARENT',
    name: 'Vikram Sharma (Mobile App)',
    email: 'vikram.sharma@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Parent Mobile Application'
  }
];
