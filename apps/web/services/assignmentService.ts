import { mockAssignments } from '@school-erp/mock-data';
import { Assignment, AssignmentSubmission } from '@school-erp/types';

export const mockSubmissions: AssignmentSubmission[] = [
  {
    id: 'SUB-101',
    assignmentId: 'ASN-301',
    studentId: 'STU-1024',
    studentName: 'Rahul Sharma',
    submittedAt: '2026-09-15T10:14:00Z',
    status: 'Submitted',
    fileUrl: 'quadratic_equation_homework_rahul.pdf'
  }
];

export const assignmentService = {
  async getAssignments(): Promise<Assignment[]> {
    return Promise.resolve(mockAssignments);
  },

  async createAssignment(data: Omit<Assignment, 'id' | 'submissionCount'>): Promise<Assignment> {
    const newAssignment: Assignment = {
      ...data,
      id: `ASN-${Math.floor(300 + Math.random() * 600)}`,
      submissionCount: 0
    };
    mockAssignments.unshift(newAssignment);
    return Promise.resolve(newAssignment);
  },

  async submitAssignment(assignmentId: string, studentId: string, fileUrl: string): Promise<AssignmentSubmission> {
    const existing = mockSubmissions.find(s => s.assignmentId === assignmentId && s.studentId === studentId);
    if (existing) {
      existing.status = 'Submitted';
      existing.fileUrl = fileUrl;
      existing.submittedAt = new Date().toISOString();
      return Promise.resolve(existing);
    }

    const newSub: AssignmentSubmission = {
      id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      assignmentId,
      studentId,
      studentName: 'Rahul Sharma',
      submittedAt: new Date().toISOString(),
      status: 'Submitted',
      fileUrl
    };
    mockSubmissions.unshift(newSub);

    const asn = mockAssignments.find(a => a.id === assignmentId);
    if (asn) asn.submissionCount += 1;

    return Promise.resolve(newSub);
  },

  async evaluateSubmission(submissionId: string, marksObtained: number, feedback: string): Promise<AssignmentSubmission> {
    const sub = mockSubmissions.find(s => s.id === submissionId);
    if (sub) {
      sub.status = 'Graded';
      sub.marksObtained = marksObtained;
      sub.feedback = feedback;
      return Promise.resolve(sub);
    }
    return Promise.reject(new Error('Submission not found'));
  }
};
