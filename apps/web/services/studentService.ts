import { mockStudents } from '@school-erp/mock-data';
import { Student } from '@school-erp/types';

export const studentService = {
  async getStudents(query?: string, classFilter?: string): Promise<Student[]> {
    let results = [...mockStudents];
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.rollNo.includes(q));
    }
    if (classFilter && classFilter !== 'all') {
      results = results.filter(s => s.className === classFilter || s.classId === classFilter);
    }
    return Promise.resolve(results);
  },

  async getStudentById(id: string): Promise<Student | undefined> {
    const student = mockStudents.find(s => s.id === id || s.rollNo === id);
    return Promise.resolve(student || mockStudents[0]); // default fallback for demo
  },

  async updateStudent(id: string, data: Partial<Student>): Promise<Student> {
    const index = mockStudents.findIndex(s => s.id === id);
    if (index !== -1) {
      mockStudents[index] = { ...mockStudents[index], ...data };
      return Promise.resolve(mockStudents[index]);
    }
    return Promise.reject(new Error('Student not found'));
  }
};
