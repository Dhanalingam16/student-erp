import { mockAdmissionLeads } from '@school-erp/mock-data';
import { AdmissionLead } from '@school-erp/types';

export const admissionService = {
  async getLeads(): Promise<AdmissionLead[]> {
    return Promise.resolve(mockAdmissionLeads);
  },

  async updateLeadStatus(id: string, status: AdmissionLead['status']): Promise<AdmissionLead> {
    const lead = mockAdmissionLeads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      return Promise.resolve(lead);
    }
    return Promise.reject(new Error('Lead not found'));
  }
};
