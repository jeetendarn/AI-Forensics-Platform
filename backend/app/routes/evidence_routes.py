from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Evidence

router = APIRouter()

# =========================
# DATABASE SESSION
# =========================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# =========================
# GET ALL EVIDENCE
# =========================

@router.get("/evidence-list")

def get_evidence_list():

    db = SessionLocal()

    evidence = db.query(Evidence).all()

    result = []

    for item in evidence:

        result.append({

            "id": item.id,

            "filename": item.filename,

            "uploaded_by": item.uploaded_by,

            "file_hash": item.file_hash,

            "notes": item.notes,

            "severity": item.severity,

            "ai_verdict": item.ai_verdict,

            "uploaded_at": item.uploaded_at
        })

    return result