"""
Enterprise School ERP - FastAPI Backend Service
Vidya Mandir Public School
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Vidya Mandir School ERP API",
    description="Enterprise Multi-Role School Management Engine for Students, Parents, Teachers, and Admin",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS middleware for Web Portals and Mobile Clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "institution": "Vidya Mandir Public School",
        "session": "2026-2027",
        "services": {
            "database": "connected",
            "redis_cache": "connected",
            "celery_workers": "active"
        }
    }

@app.get("/api/v1/institution/overview", tags=["Public"])
def institution_overview():
    return {
        "name": "Vidya Mandir Public School",
        "affiliation": "CBSE/AFF/2730419",
        "active_students": 1420,
        "teaching_staff": 84,
        "bus_fleet": 16,
        "academic_session": "2026-2027",
        "terms": ["Term 1 (Apr-Sep)", "Term 2 (Oct-Mar)"]
    }

# Modular routers will be included here:
# app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
# app.include_router(students.router, prefix="/api/v1/students", tags=["Students"])
# app.include_router(attendance.router, prefix="/api/v1/attendance", tags=["Attendance"])
# app.include_router(academics.router, prefix="/api/v1/academics", tags=["Academics"])
# app.include_router(examinations.router, prefix="/api/v1/examinations", tags=["Examinations"])
# app.include_router(finance.router, prefix="/api/v1/finance", tags=["Finance"])
# app.include_router(transport.router, prefix="/api/v1/transport", tags=["Transport"])
