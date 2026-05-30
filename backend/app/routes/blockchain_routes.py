from fastapi import APIRouter, Depends

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

@router.get("/blockchain/evidence")

def get_all_evidence(
    db: Session = Depends(get_db)
):

    evidence_list = db.query(Evidence).all()

    result = []

    for evidence in evidence_list:

        result.append({

            "id": evidence.id,

            "filename": evidence.filename,

            "file_hash": evidence.file_hash,

            "uploaded_by": evidence.uploaded_by,

            "notes": evidence.notes,

            "ai_verdict": evidence.ai_verdict,

            "severity": evidence.severity,

            "threat_score": evidence.threat_score,

            "uploaded_at": evidence.uploaded_at
        })

    return result