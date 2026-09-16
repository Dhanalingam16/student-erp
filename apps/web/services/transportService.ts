import { mockTransportRoutes } from '@school-erp/mock-data';
import { TransportRoute } from '@school-erp/types';

export const transportService = {
  async getRoutes(): Promise<TransportRoute[]> {
    return Promise.resolve(mockTransportRoutes);
  }
};
