import {
  Student, Teacher, School, ClassSection, AttendanceRecord,
  Assignment, Exam, ExamResult, FeeLedger, PaymentTransaction,
  TransportRoute, HostelDorm, LibraryBook, HealthRecord, Announcement,
  CalendarEvent, Certificate, AIInsight, AdmissionLead
} from '@school-erp/types';

export const mockSchools: School[] = [
  {
    id: 'SCH-001',
    name: 'St. Xavier International School',
    code: 'SXIS-DEL',
    logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=120&auto=format&fit=crop&q=80',
    address: 'Sector 14, Dwarka, New Delhi 110075',
    principalName: 'Dr. Rajesh Sharma',
    activeStudents: 5000,
    activeTeachers: 250,
    subscriptionPlan: 'Enterprise',
    status: 'Active',
  },
  {
    id: 'SCH-002',
    name: 'Delhi Public Academy',
    code: 'DPA-MUM',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    address: 'Bandra West, Mumbai 400050',
    principalName: 'Mrs. Sunita Rao',
    activeStudents: 3200,
    activeTeachers: 180,
    subscriptionPlan: 'Pro',
    status: 'Active',
  }
];

export const mockStudents: Student[] = [
  {
    id: 'STU-1024',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    classId: 'CLS-10A',
    className: 'Grade 10',
    section: 'A',
    rollNo: '1024',
    gender: 'Male',
    dob: '2010-04-12',
    admissionYear: 2020,
    status: 'Active',
    attendancePercentage: 91.4,
    academicScore: 84.0,
    feesPending: 2500,
    feesStatus: 'Pending',
    parentId: 'PRN-901',
    parentName: 'Vikram Sharma',
    parentPhone: '+91 98765 43210',
    address: 'B-402, Green Valley Apartments, Dwarka Sec-12, New Delhi',
    bloodGroup: 'O+',
    transportRouteId: 'TR-04',
    hostelRoomNo: 'H-302'
  },
  {
    id: 'STU-1025',
    name: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    classId: 'CLS-6B',
    className: 'Grade 6',
    section: 'B',
    rollNo: '602',
    gender: 'Female',
    dob: '2014-08-22',
    admissionYear: 2022,
    status: 'Active',
    attendancePercentage: 96.2,
    academicScore: 92.5,
    feesPending: 0,
    feesStatus: 'Paid',
    parentId: 'PRN-901',
    parentName: 'Vikram Sharma',
    parentPhone: '+91 98765 43210',
    address: 'B-402, Green Valley Apartments, Dwarka Sec-12, New Delhi',
    bloodGroup: 'B+',
    transportRouteId: 'TR-04'
  },
  {
    id: 'STU-1026',
    name: 'Arjun Verma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    classId: 'CLS-10A',
    className: 'Grade 10',
    section: 'A',
    rollNo: '1025',
    gender: 'Male',
    dob: '2010-01-15',
    admissionYear: 2020,
    status: 'Active',
    attendancePercentage: 71.8,
    academicScore: 68.4,
    feesPending: 12500,
    feesStatus: 'Overdue',
    parentId: 'PRN-902',
    parentName: 'Sanjay Verma',
    parentPhone: '+91 98112 33445',
    address: 'Flat 101, Sun City, New Delhi',
    bloodGroup: 'A+'
  },
  {
    id: 'STU-1027',
    name: 'Kavya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    classId: 'CLS-10A',
    className: 'Grade 10',
    section: 'A',
    rollNo: '1026',
    gender: 'Female',
    dob: '2010-11-05',
    admissionYear: 2021,
    status: 'Active',
    attendancePercentage: 95.0,
    academicScore: 94.2,
    feesPending: 0,
    feesStatus: 'Paid',
    parentId: 'PRN-903',
    parentName: 'Mahesh Patel',
    parentPhone: '+91 97123 45678',
    address: 'Pocket C, Vasant Kunj, New Delhi',
    bloodGroup: 'AB+'
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: 'TCH-501',
    name: 'Priya Sundaram',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'priya.s@stxavier.edu',
    phone: '+91 98989 12345',
    department: 'Mathematics',
    designation: 'Senior PGT Mathematics',
    qualification: 'M.Sc Mathematics, B.Ed',
    joiningDate: '2018-06-15',
    status: 'Active',
    subjects: ['Mathematics', 'Statistics'],
    classesAssigned: ['10-A', '10-B', '12-A']
  },
  {
    id: 'TCH-502',
    name: 'Dr. Amit Gupta',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    email: 'amit.g@stxavier.edu',
    phone: '+91 98100 54321',
    department: 'Science',
    designation: 'Head of Department - Physics',
    qualification: 'Ph.D Physics',
    joiningDate: '2015-04-01',
    status: 'Active',
    subjects: ['Physics', 'Applied Science'],
    classesAssigned: ['10-A', '11-A', '12-A']
  }
];

export const mockClasses: ClassSection[] = [
  { id: 'CLS-10A', className: 'Grade 10', section: 'A', classTeacherId: 'TCH-501', classTeacherName: 'Priya Sundaram', studentCount: 32, roomNo: 'Room 204' },
  { id: 'CLS-10B', className: 'Grade 10', section: 'B', classTeacherId: 'TCH-502', classTeacherName: 'Dr. Amit Gupta', studentCount: 30, roomNo: 'Room 205' },
  { id: 'CLS-6B', className: 'Grade 6', section: 'B', classTeacherId: 'TCH-503', classTeacherName: 'Meera Kapur', studentCount: 28, roomNo: 'Room 108' }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 'ATT-1', date: '2026-09-15', studentId: 'STU-1024', studentName: 'Rahul Sharma', classId: 'CLS-10A', className: 'Grade 10-A', status: 'Present' },
  { id: 'ATT-2', date: '2026-09-15', studentId: 'STU-1025', studentName: 'Ananya Sharma', classId: 'CLS-6B', className: 'Grade 6-B', status: 'Present' },
  { id: 'ATT-3', date: '2026-09-15', studentId: 'STU-1026', studentName: 'Arjun Verma', classId: 'CLS-10A', className: 'Grade 10-A', status: 'Absent', remarks: 'Medical Sick Leave' },
  { id: 'ATT-4', date: '2026-09-15', studentId: 'STU-1027', studentName: 'Kavya Patel', classId: 'CLS-10A', className: 'Grade 10-A', status: 'Late', remarks: 'Bus Delay 10 mins' }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'ASN-301',
    title: 'Quadratic Equations & Polynomial Proofs',
    subject: 'Mathematics',
    classSection: '10-A',
    assignedByTeacher: 'Priya Sundaram',
    dueDate: '2026-09-18',
    totalMarks: 50,
    submissionCount: 28,
    totalStudents: 32,
    status: 'Active',
    description: 'Solve Exercise 4.2 to 4.5 from NCERT. Include step-by-step discriminant derivations.'
  },
  {
    id: 'ASN-302',
    title: 'Electromagnetic Induction Lab Report',
    subject: 'Physics',
    classSection: '10-A',
    assignedByTeacher: 'Dr. Amit Gupta',
    dueDate: '2026-09-20',
    totalMarks: 25,
    submissionCount: 15,
    totalStudents: 32,
    status: 'Active',
    description: 'Diagrammatic explanation of Faraday\'s Law with copper coil experiments.'
  }
];

export const mockExams: Exam[] = [
  { id: 'EXM-101', title: 'Half-Yearly Summative Assessment', type: 'Midterm', classSection: 'Grade 10', startDate: '2026-09-25', endDate: '2026-10-05', status: 'Scheduled', totalSubjects: 6 },
  { id: 'EXM-102', title: 'Monthly Unit Assessment 2', type: 'Unit Test', classSection: 'Grade 10-A', startDate: '2026-09-01', endDate: '2026-09-05', status: 'Completed', totalSubjects: 5 }
];

export const mockExamResults: ExamResult[] = [
  {
    id: 'RES-901',
    examId: 'EXM-102',
    examTitle: 'Monthly Unit Assessment 2',
    studentId: 'STU-1024',
    studentName: 'Rahul Sharma',
    rollNo: '1024',
    subjectResults: [
      { subject: 'Mathematics', marksObtained: 82, maxMarks: 100, grade: 'A' },
      { subject: 'Physics', marksObtained: 89, maxMarks: 100, grade: 'A+' },
      { subject: 'Chemistry', marksObtained: 85, maxMarks: 100, grade: 'A' },
      { subject: 'English', marksObtained: 74, maxMarks: 100, grade: 'B+' },
      { subject: 'Social Studies', marksObtained: 90, maxMarks: 100, grade: 'A+' }
    ],
    totalMarksObtained: 420,
    totalMaxMarks: 500,
    percentage: 84.0,
    overallGrade: 'A',
    rank: 4
  }
];

export const mockFeeLedgers: FeeLedger[] = [
  { id: 'FEE-801', studentId: 'STU-1024', studentName: 'Rahul Sharma', classSection: '10-A', totalFee: 25000, paidAmount: 22500, dueAmount: 2500, dueDate: '2026-09-30', status: 'Pending', lastPaymentDate: '2026-07-10' },
  { id: 'FEE-802', studentId: 'STU-1025', studentName: 'Ananya Sharma', classSection: '6-B', totalFee: 18500, paidAmount: 18500, dueAmount: 0, dueDate: '2026-09-30', status: 'Paid', lastPaymentDate: '2026-09-02' },
  { id: 'FEE-803', studentId: 'STU-1026', studentName: 'Arjun Verma', classSection: '10-A', totalFee: 25000, paidAmount: 12500, dueAmount: 12500, dueDate: '2026-08-15', status: 'Overdue', lastPaymentDate: '2026-04-12' }
];

export const mockTransactions: PaymentTransaction[] = [
  { id: 'TXN-7701', studentId: 'STU-1024', studentName: 'Rahul Sharma', receiptNo: 'RCP-2026-089', amount: 11250, paymentMethod: 'UPI', transactionDate: '2026-07-10', status: 'Success', term: 'Quarter 1 Tuition' },
  { id: 'TXN-7702', studentId: 'STU-1025', studentName: 'Ananya Sharma', receiptNo: 'RCP-2026-112', amount: 18500, paymentMethod: 'Net Banking', transactionDate: '2026-09-02', status: 'Success', term: 'Quarter 2 Total Fee' }
];

export const mockTransportRoutes: TransportRoute[] = [
  { id: 'TR-04', busNo: 'DL-01-EB-4402', driverName: 'Ramesh Chand', driverPhone: '+91 98711 00223', routeName: 'Dwarka Sector 10-22 Express', startPoint: 'Dwarka Sec-21 Metro', endPoint: 'School Campus', totalStops: 12, capacity: 42, allocatedStudents: 38, status: 'On Time' },
  { id: 'TR-08', busNo: 'DL-01-EB-8819', driverName: 'Suresh Kumar', driverPhone: '+91 98119 44332', routeName: 'Vasant Kunj Shuttle', startPoint: 'Vasant Square Mall', endPoint: 'School Campus', totalStops: 8, capacity: 42, allocatedStudents: 40, status: 'On Time' }
];

export const mockHostelDorms: HostelDorm[] = [
  { id: 'HST-1', buildingName: 'Tagore Boys Hostel', roomNo: 'H-302', type: 'Double', capacity: 2, occupied: 2, wardenName: 'Prof. V. K. Nambiar', wardenPhone: '+91 99001 22334' }
];

export const mockLibraryBooks: LibraryBook[] = [
  { id: 'BK-501', title: 'Concepts of Physics (Vol 1)', author: 'H. C. Verma', isbn: '978-8177091877', category: 'Science', totalCopies: 25, availableCopies: 8, rackLocation: 'Rack B-4' },
  { id: 'BK-502', title: 'NCERT Mathematics Class X', author: 'NCERT Editorial Panel', isbn: '978-8174506344', category: 'Mathematics', totalCopies: 50, availableCopies: 19, rackLocation: 'Rack A-2' }
];

export const mockHealthRecords: HealthRecord[] = [
  { id: 'HLT-101', studentId: 'STU-1024', studentName: 'Rahul Sharma', bloodGroup: 'O+', heightCm: 168, weightKg: 58, allergies: ['Dust Mild'], medicalConditions: ['None'], lastCheckupDate: '2026-07-15', emergencyContact: '+91 98765 43210' }
];

export const mockAnnouncements: Announcement[] = [
  { id: 'ANC-1', title: 'Half-Yearly Examination Timetable Published', content: 'The comprehensive timetable for Grades 6 to 12 examinations has been posted. Download from portal.', category: 'Academic', targetAudience: 'All', publishedAt: '2026-09-14T09:00:00Z', author: 'Exam Controller', isImportant: true },
  { id: 'ANC-2', title: 'Annual Inter-School Athletics Meet Registration', content: 'Students interested in track and field events should register with Sports Dept by Friday.', category: 'Event', targetAudience: 'Students', publishedAt: '2026-09-12T11:30:00Z', author: 'Sports Department', isImportant: false }
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: 'EVT-1', title: 'Parent-Teacher Meeting (Term 1)', date: '2026-09-20', time: '09:00 AM - 01:00 PM', category: 'PTM', location: 'Main Auditorium & Classrooms', description: 'One-on-one discussion regarding student progress and half-yearly goals.' },
  { id: 'EVT-2', title: 'Annual Science & Tech Fair 2026', date: '2026-10-12', time: '10:00 AM - 04:00 PM', category: 'Cultural', location: 'School Indoor Stadium', description: 'Student project displays and working prototype exhibits.' }
];

export const mockCertificates: Certificate[] = [
  { id: 'CRT-101', certificateNo: 'BON-2026-044', type: 'Bonafide', studentId: 'STU-1024', studentName: 'Rahul Sharma', issueDate: '2026-08-10', status: 'Approved', requestedBy: 'Parent (Passport Application)' }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'INS-01',
    targetRole: 'SCHOOL_ADMIN',
    title: 'Attendance Drop Alert in Grade 10-A',
    category: 'Attendance Alert',
    description: '12 students have attendance below the 75% regulatory threshold. Grade 10-A attendance dipped 3.2% this month.',
    recommendation: ['Notify class teacher Priya Sundaram', 'Send automated alert SMS to parents of flagged students', 'Schedule counselor check-in for recurring absentees'],
    actionLabel: 'View Flagged Students',
    actionRoute: '/school/students?filter=low-attendance'
  },
  {
    id: 'INS-02',
    targetRole: 'TEACHER',
    title: 'Mathematics Algebra Declining Performance',
    category: 'Performance Alert',
    description: '3 students in 10-A are showing a downward trend of >8% in recent Algebra unit assessments.',
    recommendation: ['Provide remedial worksheet for Quadratic Formula', 'Schedule 15-minute review session post 5th period'],
    actionLabel: 'Review Student Scores',
    actionRoute: '/teacher/marks'
  },
  {
    id: 'INS-03',
    targetRole: 'STUDENT',
    title: 'Upcoming Physics Exam Prep Focus',
    category: 'Study Recommendation',
    description: 'You have your Physics Half-Yearly paper in 10 days. Historical score indicates room for improvement in Electromagnetic Induction.',
    recommendation: ['Review Faraday Law experiment lab notes', 'Solve 3 previous year sample question sets on Magnetism'],
    actionLabel: 'Open Study Material',
    actionRoute: '/student/study-materials'
  },
  {
    id: 'INS-04',
    targetRole: 'PARENT',
    title: 'Rahul\'s Monthly Academic Summary',
    category: 'Study Recommendation',
    description: 'Rahul\'s overall attendance is strong at 91.4%. Physics & Science are excellent (89%), but English score declined by 8% in recent unit test.',
    recommendation: ['Encourage 30 mins daily English comprehension reading', 'Discuss review notes with Ms. Priya during upcoming PTM'],
    actionLabel: 'View Detailed Report Card',
    actionRoute: '/parent/results'
  }
];

export const mockAdmissionLeads: AdmissionLead[] = [
  { id: 'ADM-01', applicantName: 'Siddharth Nair', applyingClass: 'Grade 11 Science', parentName: 'Gopakumar Nair', phone: '+91 98440 11223', email: 'g.nair@gmail.com', status: 'Verification', appliedDate: '2026-09-10' },
  { id: 'ADM-02', applicantName: 'Riya Gupta', applyingClass: 'Grade 1', parentName: 'Deepak Gupta', phone: '+91 97110 55443', email: 'd.gupta@yahoo.com', status: 'Interview', appliedDate: '2026-09-08' },
  { id: 'ADM-03', applicantName: 'Aarav Mehta', applyingClass: 'Grade 9', parentName: 'Rajesh Mehta', phone: '+91 98200 99887', email: 'rmehta@gmail.com', status: 'Approved', appliedDate: '2026-09-01' }
];
