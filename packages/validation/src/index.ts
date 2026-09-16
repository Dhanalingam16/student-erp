import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const studentAdmissionSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  classId: z.string().min(1, 'Please select a class'),
  section: z.string().min(1, 'Please select a section'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  parentName: z.string().min(2, 'Parent name is required'),
  parentPhone: z.string().min(10, 'Valid 10-digit phone number is required'),
  address: z.string().min(5, 'Residential address is required'),
  bloodGroup: z.string().min(1, 'Select blood group'),
});

export const marksEntrySchema = z.object({
  studentId: z.string(),
  subject: z.string().min(1, 'Subject is required'),
  marksObtained: z.number().min(0).max(100, 'Marks cannot exceed max marks'),
  maxMarks: z.number().min(10).default(100),
  feedback: z.string().optional(),
});

export const feePaymentSchema = z.object({
  studentId: z.string(),
  amount: z.number().min(100, 'Minimum payment amount is ₹100'),
  paymentMethod: z.enum(['UPI', 'Credit Card', 'Net Banking', 'Cash', 'Cheque']),
  term: z.string().min(1, 'Select fee term'),
});

export const leaveRequestSchema = z.object({
  studentId: z.string(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(10, 'Please describe reason in detail (min 10 chars)'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type StudentAdmissionFormData = z.infer<typeof studentAdmissionSchema>;
export type MarksEntryFormData = z.infer<typeof marksEntrySchema>;
export type FeePaymentFormData = z.infer<typeof feePaymentSchema>;
export type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>;
