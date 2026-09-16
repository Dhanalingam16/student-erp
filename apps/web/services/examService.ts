import { mockExams, mockExamResults } from '@school-erp/mock-data';
import { Exam, ExamResult } from '@school-erp/types';

export const examService = {
  async getExams(): Promise<Exam[]> {
    return Promise.resolve(mockExams);
  },

  async getResultByStudent(studentId: string): Promise<ExamResult | undefined> {
    return Promise.resolve(mockExamResults.find(r => r.studentId === studentId) || mockExamResults[0]);
  }
};
