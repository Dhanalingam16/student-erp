'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Parent,
  Teacher,
  AttendanceRecord,
  HomeworkItem,
  AssignmentSubmission,
  ExamRecord,
  StudentMarks,
  FeeTransaction,
  BusRoute,
  VisitorPass,
  ClinicVisit,
  LibraryBook,
  BroadcastAnnouncement,
  UserSession,
  RoleType,
} from '@/types';
import {
  INITIAL_STUDENTS,
  INITIAL_PARENTS,
  INITIAL_TEACHERS,
  INITIAL_ATTENDANCE_10A,
  INITIAL_HOMEWORK,
  INITIAL_ASSIGNMENT_SUBMISSIONS,
  INITIAL_EXAMS,
  INITIAL_STUDENT_MARKS_10A_MATH,
  INITIAL_FEE_TRANSACTIONS,
  INITIAL_BUS_ROUTES,
  INITIAL_VISITOR_PASSES,
  INITIAL_CLINIC_VISITS,
  INITIAL_LIBRARY_BOOKS,
  INITIAL_ANNOUNCEMENTS,
} from './demo-data';
import { DEMO_PRESET_USERS, calculateCbseGrade } from './constants';

interface ERPStoreContextType {
  currentUser: UserSession;
  setCurrentUser: (user: UserSession) => void;
  switchRole: (role: RoleType) => void;
  
  // Parent state
  selectedChildId: string;
  setSelectedChildId: (id: string) => void;
  selectedChild: Student;

  // Mobile Device Frame toggle
  deviceFrameEnabled: boolean;
  setDeviceFrameEnabled: (val: boolean) => void;

  // Collections & Interactive Mutations
  students: Student[];
  teachers: Teacher[];
  parents: Parent[];
  attendance: AttendanceRecord[];
  homework: HomeworkItem[];
  submissions: AssignmentSubmission[];
  exams: ExamRecord[];
  marks: StudentMarks[];
  feeTransactions: FeeTransaction[];
  busRoutes: BusRoute[];
  visitorPasses: VisitorPass[];
  clinicVisits: ClinicVisit[];
  libraryBooks: LibraryBook[];
  announcements: BroadcastAnnouncement[];

  // Action methods
  markAttendance: (records: AttendanceRecord[]) => void;
  addHomework: (item: Omit<HomeworkItem, 'id' | 'totalSubmissions' | 'totalStudents'>) => void;
  gradeSubmission: (submissionId: string, marks: number, feedback: string) => void;
  submitMarks: (examId: string, updatedMarks: StudentMarks[]) => void;
  processFeePayment: (
    studentId: string,
    amount: number,
    paymentMode: 'upi' | 'net_banking' | 'credit_card' | 'cash' | 'cheque',
    termTitle: string
  ) => FeeTransaction;
  createVisitorPass: (pass: Omit<VisitorPass, 'id' | 'passNumber' | 'status' | 'entryTime'>) => VisitorPass;
  checkoutVisitor: (passId: string) => void;
  addAnnouncement: (announcement: Omit<BroadcastAnnouncement, 'id' | 'publishedAt'>) => void;
}

const ERPStoreContext = createContext<ERPStoreContextType | null>(null);

export const ERPStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserSession>({
    id: 'usr-admin-01',
    name: 'Dr. Arvind Swaminathan',
    email: 'admin@vidyamandir.edu.in',
    role: 'super_admin',
    designation: 'Principal & Director of Administration',
  });

  const [selectedChildId, setSelectedChildId] = useState<string>('std-10101');
  const [deviceFrameEnabled, setDeviceFrameEnabled] = useState<boolean>(false);

  // ERP State Data
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [parents] = useState<Parent[]>(INITIAL_PARENTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_10A);
  const [homework, setHomework] = useState<HomeworkItem[]>(INITIAL_HOMEWORK);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(INITIAL_ASSIGNMENT_SUBMISSIONS);
  const [exams] = useState<ExamRecord[]>(INITIAL_EXAMS);
  const [marks, setMarks] = useState<StudentMarks[]>(INITIAL_STUDENT_MARKS_10A_MATH);
  const [feeTransactions, setFeeTransactions] = useState<FeeTransaction[]>(INITIAL_FEE_TRANSACTIONS);
  const [busRoutes] = useState<BusRoute[]>(INITIAL_BUS_ROUTES);
  const [visitorPasses, setVisitorPasses] = useState<VisitorPass[]>(INITIAL_VISITOR_PASSES);
  const [clinicVisits] = useState<ClinicVisit[]>(INITIAL_CLINIC_VISITS);
  const [libraryBooks] = useState<LibraryBook[]>(INITIAL_LIBRARY_BOOKS);
  const [announcements, setAnnouncements] = useState<BroadcastAnnouncement[]>(INITIAL_ANNOUNCEMENTS);

  // Load / Persist from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('vmps_current_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      const savedChild = localStorage.getItem('vmps_selected_child');
      if (savedChild) setSelectedChildId(savedChild);
    } catch {
      // Ignore in SSR
    }
  }, []);

  const switchRole = (role: RoleType) => {
    const preset = DEMO_PRESET_USERS.find((p) => p.role === role);
    if (preset) {
      const newUser: UserSession = {
        id: `usr-${role}-01`,
        name: preset.name,
        email: preset.email,
        role: preset.role,
        designation: preset.designation,
        classTeacherOf: (preset as any).classSection,
      };
      setCurrentUser(newUser);
      try {
        localStorage.setItem('vmps_current_user', JSON.stringify(newUser));
      } catch {}
    }
  };

  const selectedChild = students.find((s) => s.id === selectedChildId) || students[0];

  const handleSelectChild = (id: string) => {
    setSelectedChildId(id);
    try {
      localStorage.setItem('vmps_selected_child', id);
    } catch {}
  };

  // 1. Submit Attendance for a class
  const markAttendance = (records: AttendanceRecord[]) => {
    setAttendance((prev) => {
      const recordMap = new Map(prev.map((r) => [`${r.studentId}-${r.date}`, r]));
      records.forEach((r) => {
        recordMap.set(`${r.studentId}-${r.date}`, r);
      });
      return Array.from(recordMap.values());
    });
  };

  // 2. Add Homework
  const addHomework = (item: Omit<HomeworkItem, 'id' | 'totalSubmissions' | 'totalStudents'>) => {
    const newItem: HomeworkItem = {
      ...item,
      id: `hw-${Date.now()}`,
      totalSubmissions: 0,
      totalStudents: 36,
    };
    setHomework((prev) => [newItem, ...prev]);
  };

  // 3. Grade assignment submission
  const gradeSubmission = (submissionId: string, marksObtained: number, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? { ...sub, status: 'graded', marksObtained, teacherFeedback: feedback }
          : sub
      )
    );
  };

  // 4. Submit Examination Marks
  const submitMarks = (_examId: string, updatedMarks: StudentMarks[]) => {
    setMarks(updatedMarks);
  };

  // 5. Process Fee Payment & Generate Receipt
  const processFeePayment = (
    studentId: string,
    amount: number,
    paymentMode: 'upi' | 'net_banking' | 'credit_card' | 'cash' | 'cheque',
    termTitle: string
  ): FeeTransaction => {
    const targetStudent = students.find((s) => s.id === studentId);
    const receiptNum = `VMPS/2026-27/REC-${Math.floor(5100 + Math.random() * 899)}`;
    const now = new Date();
    const dateFormatted = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    const newTxn: FeeTransaction = {
      id: `txn-${Date.now()}`,
      receiptNumber: receiptNum,
      studentId: studentId,
      studentName: targetStudent ? targetStudent.fullName : 'Student',
      classSection: targetStudent ? targetStudent.classSection : '10-A',
      amountPaid: amount,
      paymentMode,
      transactionDate: dateFormatted,
      status: 'success',
      termTitle,
      feeHeads: [
        { head: 'Tuition Fee Installment', amount: Math.round(amount * 0.75) },
        { head: 'Development & Activity Charges', amount: Math.round(amount * 0.25) },
      ],
    };

    // Update Student fee balance
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const newPending = Math.max(0, s.pendingFeeAmount - amount);
          return {
            ...s,
            pendingFeeAmount: newPending,
            feeStatus: newPending === 0 ? 'paid' : 'partial',
          };
        }
        return s;
      })
    );

    setFeeTransactions((prev) => [newTxn, ...prev]);
    return newTxn;
  };

  // 6. Security Visitor Pass
  const createVisitorPass = (pass: Omit<VisitorPass, 'id' | 'passNumber' | 'status' | 'entryTime'>): VisitorPass => {
    const passNumber = `VP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const entryTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newPass: VisitorPass = {
      ...pass,
      id: `vp-${Date.now()}`,
      passNumber,
      status: 'active',
      entryTime,
    };

    setVisitorPasses((prev) => [newPass, ...prev]);
    return newPass;
  };

  const checkoutVisitor = (passId: string) => {
    const now = new Date();
    const exitTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setVisitorPasses((prev) =>
      prev.map((vp) => (vp.id === passId ? { ...vp, status: 'checked_out', exitTime } : vp))
    );
  };

  // 7. Publish Announcement
  const addAnnouncement = (ann: Omit<BroadcastAnnouncement, 'id' | 'publishedAt'>) => {
    const now = new Date();
    const dateFormatted = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const newAnc: BroadcastAnnouncement = {
      ...ann,
      id: `anc-${Date.now()}`,
      publishedAt: dateFormatted,
    };
    setAnnouncements((prev) => [newAnc, ...prev]);
  };

  return (
    <ERPStoreContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        selectedChildId,
        setSelectedChildId: handleSelectChild,
        selectedChild,
        deviceFrameEnabled,
        setDeviceFrameEnabled,
        students,
        teachers,
        parents,
        attendance,
        homework,
        submissions,
        exams,
        marks,
        feeTransactions,
        busRoutes,
        visitorPasses,
        clinicVisits,
        libraryBooks,
        announcements,
        markAttendance,
        addHomework,
        gradeSubmission,
        submitMarks,
        processFeePayment,
        createVisitorPass,
        checkoutVisitor,
        addAnnouncement,
      }}
    >
      {children}
    </ERPStoreContext.Provider>
  );
};

export const useERPStore = () => {
  const context = useContext(ERPStoreContext);
  if (!context) {
    throw new Error('useERPStore must be used within an ERPStoreProvider');
  }
  return context;
};
