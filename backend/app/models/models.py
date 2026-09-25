"""
SQLAlchemy Database Models for Vidya Mandir School ERP
"""

from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False) # admin, teacher, parent, student
    full_name = Column(String, nullable=False)
    phone = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class StudentModel(Base):
    __tablename__ = "students"

    id = Column(String, primary_key=True)
    admission_no = Column(String, unique=True, nullable=False, index=True)
    roll_number = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    dob = Column(String, nullable=False)
    class_section = Column(String, nullable=False, index=True)
    parent_name = Column(String)
    parent_phone = Column(String)
    blood_group = Column(String)
    bus_route_id = Column(String)
    is_hostelite = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AttendanceModel(Base):
    __tablename__ = "attendance"

    id = Column(String, primary_key=True)
    student_id = Column(String, ForeignKey("students.id"), nullable=False, index=True)
    class_section = Column(String, nullable=False, index=True)
    date = Column(String, nullable=False, index=True)
    status = Column(String, nullable=False) # present, absent, late, excused
    check_in_time = Column(String)
    remarks = Column(Text)

class FeePaymentModel(Base):
    __tablename__ = "fee_payments"

    id = Column(String, primary_key=True)
    receipt_no = Column(String, unique=True, nullable=False, index=True)
    student_id = Column(String, ForeignKey("students.id"), nullable=False)
    amount_paid = Column(Float, nullable=False)
    payment_mode = Column(String, nullable=False)
    term_title = Column(String, nullable=False)
    payment_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="success")
