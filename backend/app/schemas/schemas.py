"""
Pydantic Schemas for School ERP
"""

from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: str
    user_name: str

class LoginRequest(BaseModel):
    username_or_email: str
    password: str
    role_hint: Optional[str] = None

class StudentResponse(BaseModel):
    id: str
    admission_no: str
    roll_number: str
    full_name: str
    class_section: str
    gender: str
    attendance_pct: float
    fee_status: str
    pending_fee_inr: float

class AttendanceSubmitRequest(BaseModel):
    class_section: str
    date: str
    records: List[dict] # {student_id, status, check_in_time, remarks}

class FeeCollectionRequest(BaseModel):
    student_id: str
    amount_paid: float
    payment_mode: str # upi, net_banking, cash, cheque
    term_title: str
    reference_number: Optional[str] = None
    remarks: Optional[str] = None

class MarksEntryItem(BaseModel):
    student_id: str
    marks_obtained: float
    max_marks: float
    remarks: Optional[str] = None

class MarksSubmitRequest(BaseModel):
    exam_id: str
    class_section: str
    subject: str
    is_draft: bool = False
    marks: List[MarksEntryItem]
