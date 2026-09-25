/**
 * Enterprise School ERP Shared Types
 * Institution: Vidya Mandir Public School
 */

export type RoleType = 
  | 'super_admin'
  | 'school_admin'
  | 'principal'
  | 'accountant'
  | 'teacher'
  | 'parent'
  | 'student'
  | 'librarian'
  | 'transport_manager'
  | 'hostel_warden'
  | 'security_guard';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  avatarUrl?: string;
  phone?: string;
  designation?: string;
  linkedStudentIds?: string[]; // For parents
  classTeacherOf?: string;     // e.g. "10-A"
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day' | 'excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  classId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  checkInTime?: string;
  remarks?: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  rollNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  class: string;     // e.g. "10"
  section: string;   // e.g. "A"
  classSection: string; // e.g. "10-A"
  academicYear: string; // "2026-2027"
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  bloodGroup: string;
  address: string;
  busRouteId?: string;
  busStopName?: string;
  isHostelite: boolean;
  hostelRoom?: string;
  overallAttendancePercentage: number;
  feeStatus: 'paid' | 'pending' | 'overdue' | 'partial';
  pendingFeeAmount: number;
  avatarUrl?: string;
}

export interface Parent {
  id: string;
  fatherName: string;
  motherName: string;
  primaryContact: string;
  email: string;
  occupation: string;
  children: {
    studentId: string;
    studentName: string;
    classSection: string;
    rollNumber: string;
  }[];
}

export interface Teacher {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  phone: string;
  designation: string; // e.g. "PGT Mathematics"
  qualification: string;
  department: string;
  isClassTeacher: boolean;
  classSection?: string;
  subjects: string[];
  classes: string[];
}

export interface TimetablePeriod {
  periodNumber: number;
  startTime: string; // e.g. "08:00 AM"
  endTime: string;   // e.g. "08:45 AM"
  subject: string;
  teacherName: string;
  roomNumber: string;
}

export interface HomeworkItem {
  id: string;
  title: string;
  description: string;
  classSection: string;
  subject: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  attachments?: string[];
  totalSubmissions: number;
  totalStudents: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  submittedAt: string;
  fileUrl?: string;
  status: 'submitted' | 'graded' | 'late' | 'pending';
  marksObtained?: number;
  maxMarks: number;
  teacherFeedback?: string;
}

export interface ExamRecord {
  id: string;
  title: string; // e.g. "Half-Yearly Examination 2026"
  academicYear: string;
  classSection: string;
  subject: string;
  examDate: string;
  maxMarks: number;
  passingMarks: number;
  status: 'scheduled' | 'ongoing' | 'marks_entry' | 'published';
}

export interface StudentMarks {
  studentId: string;
  studentName: string;
  rollNumber: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  remarks?: string;
}

export interface FeeHead {
  name: string;
  amount: number;
}

export interface FeeStructure {
  id: string;
  classSection: string;
  title: string; // e.g. "Class 10 Regular Fee 2026-27"
  annualTuition: number;
  developmentCharges: number;
  labCharges: number;
  termInstallments: {
    termNumber: number;
    title: string;
    dueDate: string;
    amount: number;
  }[];
}

export interface FeeTransaction {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  classSection: string;
  amountPaid: number;
  paymentMode: 'upi' | 'net_banking' | 'credit_card' | 'cash' | 'cheque';
  transactionDate: string;
  status: 'success' | 'failed' | 'pending';
  feeHeads: { head: string; amount: number }[];
  termTitle: string;
}

export interface BusRoute {
  id: string;
  routeNumber: string; // e.g. "Route 12"
  routeName: string;   // "Dwarka Sector 6 to School"
  busNumber: string;   // "DL-01-AB-4592"
  capacity: number;
  assignedStudents: number;
  driverName: string;
  driverPhone: string;
  attendantName: string;
  attendantPhone: string;
  currentStatus: 'on_route' | 'delayed' | 'completed' | 'stationary';
  currentLocationName: string;
  stops: {
    stopId: string;
    stopName: string;
    pickupTime: string;
    dropTime: string;
    studentsCount: number;
    status: 'passed' | 'approaching' | 'next' | 'pending';
  }[];
}

export interface VisitorPass {
  id: string;
  passNumber: string;
  visitorName: string;
  phone: string;
  purpose: string;
  meetingPerson: string;
  entryTime: string;
  exitTime?: string;
  status: 'active' | 'checked_out';
  vehicleNumber?: string;
}

export interface ClinicVisit {
  id: string;
  studentName: string;
  classSection: string;
  visitTime: string;
  symptoms: string;
  treatment: string;
  medicationGiven: string;
  attendingNurse: string;
  parentNotified: boolean;
}

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  rackLocation: string;
}

export interface BroadcastAnnouncement {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'transport' | 'fee' | 'urgent' | 'general';
  targetAudience: 'all' | 'teachers' | 'parents' | 'students' | 'class_10';
  publishedAt: string;
  publishedBy: string;
  priority: 'normal' | 'high' | 'critical';
}
