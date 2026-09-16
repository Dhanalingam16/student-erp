export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  phone?: string;
  schoolId?: string;
  schoolName?: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  occupation?: string;
  address?: string;
  children: {
    studentId: string;
    name: string;
    classSection: string;
    avatar: string;
  }[];
}

export interface Student {
  id: string; // STU-1024
  name: string;
  avatar: string;
  classId: string;
  className: string;
  section: string;
  rollNo: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  admissionYear: number;
  status: 'Active' | 'Inactive' | 'Transferred';
  attendancePercentage: number;
  academicScore: number;
  feesPending: number;
  feesStatus: 'Paid' | 'Pending' | 'Overdue';
  parentId: string;
  parentName: string;
  parentPhone: string;
  address: string;
  bloodGroup: string;
  transportRouteId?: string;
  hostelRoomNo?: string;
}

export interface Teacher {
  id: string; // TCH-501
  name: string;
  avatar: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  qualification: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Resigned';
  subjects: string[];
  classesAssigned: string[]; // e.g. ["10-A", "9-B"]
}

export interface School {
  id: string;
  name: string;
  code: string;
  logo: string;
  address: string;
  principalName: string;
  activeStudents: number;
  activeTeachers: number;
  subscriptionPlan: 'Enterprise' | 'Pro' | 'Standard';
  status: 'Active' | 'Pending' | 'Suspended';
}

export interface ClassSection {
  id: string;
  className: string; // "Grade 10"
  section: string;   // "A"
  classTeacherId: string;
  classTeacherName: string;
  studentCount: number;
  roomNo: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  classSection: string;
  assignedByTeacher: string;
  dueDate: string;
  totalMarks: number;
  submissionCount: number;
  totalStudents: number;
  status: 'Active' | 'Closed' | 'Draft';
  description: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'Submitted' | 'Graded' | 'Pending';
  marksObtained?: number;
  feedback?: string;
  fileUrl?: string;
}

export interface Exam {
  id: string;
  title: string;
  type: 'Midterm' | 'Final' | 'Unit Test' | 'Quiz';
  classSection: string;
  startDate: string;
  endDate: string;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  totalSubjects: number;
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  subjectResults: {
    subject: string;
    marksObtained: number;
    maxMarks: number;
    grade: string;
  }[];
  totalMarksObtained: number;
  totalMaxMarks: number;
  percentage: number;
  overallGrade: string;
  rank: number;
}

export interface FeeStructure {
  id: string;
  category: 'Tuition' | 'Transport' | 'Hostel' | 'Laboratory' | 'Library';
  amount: number;
  term: 'Quarter 1' | 'Quarter 2' | 'Quarter 3' | 'Quarter 4' | 'Annual';
  dueDate: string;
}

export interface FeeLedger {
  id: string;
  studentId: string;
  studentName: string;
  classSection: string;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  lastPaymentDate?: string;
}

export interface PaymentTransaction {
  id: string;
  studentId: string;
  studentName: string;
  receiptNo: string;
  amount: number;
  paymentMethod: 'UPI' | 'Credit Card' | 'Net Banking' | 'Cash' | 'Cheque';
  transactionDate: string;
  status: 'Success' | 'Pending' | 'Failed';
  term: string;
}

export interface TransportRoute {
  id: string;
  busNo: string;
  driverName: string;
  driverPhone: string;
  routeName: string;
  startPoint: string;
  endPoint: string;
  totalStops: number;
  capacity: number;
  allocatedStudents: number;
  status: 'On Time' | 'Delayed' | 'Maintenance';
}

export interface HostelDorm {
  id: string;
  buildingName: string;
  roomNo: string;
  type: 'Single' | 'Double' | 'Quad';
  capacity: number;
  occupied: number;
  wardenName: string;
  wardenPhone: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  rackLocation: string;
}

export interface BookIssueRecord {
  id: string;
  bookTitle: string;
  studentName: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Issued' | 'Returned' | 'Overdue';
  fineAmount: number;
}

export interface HealthRecord {
  id: string;
  studentId: string;
  studentName: string;
  bloodGroup: string;
  heightCm: number;
  weightKg: number;
  allergies: string[];
  medicalConditions: string[];
  lastCheckupDate: string;
  emergencyContact: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'General' | 'Academic' | 'Emergency' | 'Holiday' | 'Event';
  targetAudience: 'All' | 'Teachers' | 'Students' | 'Parents';
  publishedAt: string;
  author: string;
  isImportant?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'Academic' | 'Exam' | 'Holiday' | 'Sports' | 'PTM' | 'Cultural';
  location: string;
  description: string;
}

export interface Certificate {
  id: string;
  certificateNo: string;
  type: 'Transfer Certificate' | 'Bonafide' | 'Character Certificate' | 'Transcript';
  studentId: string;
  studentName: string;
  issueDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  requestedBy: string;
}

export interface AIInsight {
  id: string;
  targetRole: UserRole;
  title: string;
  category: 'Performance Alert' | 'Attendance Alert' | 'Fee Warning' | 'Study Recommendation';
  description: string;
  recommendation: string[];
  actionLabel?: string;
  actionRoute?: string;
}

export interface AdmissionLead {
  id: string;
  applicantName: string;
  applyingClass: string;
  parentName: string;
  phone: string;
  email: string;
  status: 'Enquiry' | 'Application' | 'Verification' | 'Interview' | 'Approved' | 'Enrolled';
  appliedDate: string;
}
