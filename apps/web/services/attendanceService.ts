import { mockAttendanceRecords, mockStudents } from '@school-erp/mock-data';
import { AttendanceRecord, AttendanceStatus } from '@school-erp/types';

export const attendanceService = {
  async getAttendanceByClass(classId: string, date: string): Promise<AttendanceRecord[]> {
    return Promise.resolve(mockAttendanceRecords);
  },

  async updateAttendance(recordId: string, status: AttendanceStatus): Promise<AttendanceRecord> {
    const record = mockAttendanceRecords.find(r => r.id === recordId || r.studentId === recordId);
    if (record) {
      record.status = status;
    }

    // Also update student's aggregate attendance
    const student = mockStudents.find(s => s.id === recordId || s.id === record?.studentId);
    if (student) {
      if (status === 'Absent') {
        student.attendancePercentage = Math.max(0, +(student.attendancePercentage - 0.5).toFixed(1));
      } else if (status === 'Present') {
        student.attendancePercentage = Math.min(100, +(student.attendancePercentage + 0.2).toFixed(1));
      }
    }

    return Promise.resolve(record || mockAttendanceRecords[0]);
  },

  async bulkUpdateAttendance(attendanceMap: Record<string, AttendanceStatus>): Promise<void> {
    Object.entries(attendanceMap).forEach(([studentId, status]) => {
      const record = mockAttendanceRecords.find(r => r.studentId === studentId);
      if (record) record.status = status;

      const student = mockStudents.find(s => s.id === studentId);
      if (student && status === 'Absent') {
        student.attendancePercentage = Math.max(0, +(student.attendancePercentage - 0.5).toFixed(1));
      }
    });
    return Promise.resolve();
  }
};
