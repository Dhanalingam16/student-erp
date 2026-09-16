import { mockAnnouncements } from '@school-erp/mock-data';
import { Announcement } from '@school-erp/types';

export const notificationService = {
  async getNotifications(): Promise<Announcement[]> {
    return Promise.resolve(mockAnnouncements);
  }
};
