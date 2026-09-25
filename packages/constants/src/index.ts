export const INSTITUTION_INFO = {
  name: 'Vidya Mandir Public School',
  tagline: 'Excellence in Education, Integrity in Character',
  affiliationNo: 'CBSE/AFF/2730419',
  schoolCode: '71245',
  address: 'Sector 14, Phase II, Dwarka, New Delhi - 110078',
  phone: '+91 11 2808 4500 / 4501',
  email: 'info@vidyamandir.edu.in',
  academicSession: '2026–2027',
  activeTerm: 'Term 2 (Oct 2026 – Mar 2027)',
};

export const CBSE_GRADING_SCALE = [
  { minMarks: 91, maxMarks: 100, grade: 'A1', gradePoint: 10.0, remark: 'Top 1/8th of passed candidates' },
  { minMarks: 81, maxMarks: 90, grade: 'A2', gradePoint: 9.0, remark: 'Next 1/8th of passed candidates' },
  { minMarks: 71, maxMarks: 80, grade: 'B1', gradePoint: 8.0, remark: 'Next 1/8th of passed candidates' },
  { minMarks: 61, maxMarks: 70, grade: 'B2', gradePoint: 7.0, remark: 'Next 1/8th of passed candidates' },
  { minMarks: 51, maxMarks: 60, grade: 'C1', gradePoint: 6.0, remark: 'Next 1/8th of passed candidates' },
  { minMarks: 41, maxMarks: 50, grade: 'C2', gradePoint: 5.0, remark: 'Next 1/8th of passed candidates' },
  { minMarks: 33, maxMarks: 40, grade: 'D', gradePoint: 4.0, remark: 'Passing boundary' },
  { minMarks: 0, maxMarks: 32, grade: 'E', gradePoint: 0.0, remark: 'Essential Repeat' },
];

export const SCHOOL_CLASSES = [
  { id: '10-A', grade: '10', section: 'A', stream: 'General', classTeacher: 'Mrs. Lakshmi Raman', room: 'Room 204', totalStudents: 36 },
  { id: '10-B', grade: '10', section: 'B', stream: 'General', classTeacher: 'Mr. Alok Saxena', room: 'Room 205', totalStudents: 38 },
  { id: '11-A', grade: '11', section: 'A', stream: 'Science (PCM)', classTeacher: 'Mr. K. Venkatraman', room: 'Science Block 101', totalStudents: 32 },
  { id: '11-B', grade: '11', section: 'B', stream: 'Commerce', classTeacher: 'Dr. Sunita Deshmukh', room: 'Commerce Block 102', totalStudents: 35 },
  { id: '12-A', grade: '12', section: 'A', stream: 'Science (PCB)', classTeacher: 'Dr. R. K. Mukherjee', room: 'Science Block 201', totalStudents: 30 },
  { id: '8-C', grade: '8', section: 'C', stream: 'Middle School', classTeacher: 'Mrs. P. Ananthalakshmi', room: 'Room 112', totalStudents: 40 },
  { id: '6-B', grade: '6', section: 'B', stream: 'Junior School', classTeacher: 'Mrs. Shalini Gupta', room: 'Junior Block 04', totalStudents: 38 },
];

export const FEE_HEADS = [
  'Tuition Fee',
  'Annual Development Charges',
  'Science / Computer Lab Fee',
  'Transport Bus Fee',
  'Library & Digital Resources Fee',
  'Examination Fee',
  'Co-curricular Activities',
];

export const BUS_ROUTES_LIST = [
  { id: 'route-12', name: 'Route 12 - Dwarka Sector 6 to School', busNo: 'DL-01-AB-4592', driver: 'Ramesh Kumar' },
  { id: 'route-05', name: 'Route 05 - Janakpuri West to School', busNo: 'DL-01-XY-3180', driver: 'Sukhdev Singh' },
  { id: 'route-08', name: 'Route 08 - Uttam Nagar to School', busNo: 'DL-01-CD-9912', driver: 'Mohd. Imran' },
];
