import { mockTeachers } from '@school-erp/mock-data';
import { Teacher } from '@school-erp/types';

export const teacherService = {
  async getTeachers(): Promise<Teacher[]> {
    return Promise.resolve(mockTeachers);
  },

  async getTeacherById(id: string): Promise<Teacher | undefined> {
    return Promise.resolve(mockTeachers.find(t => t.id === id) || mockTeachers[0]);
  }
};
