from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import ThreatAlert
from app.schemas import AlertCreate
from app.auth import get_current_user
from app.schemas import ThreatInput
from app.ai_engine.detector import classify_threat
from fastapi import UploadFile, File
import shutil
import os
from app.models import Evidence
from app.utils.hashing import generate_sha256

router = APIRouter()


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CREATE ALERT
@router.post("/alerts")
def create_alert(
    alert: AlertCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    new_alert = ThreatAlert(
        title=alert.title,
        description=alert.description,
        severity=alert.severity
    )

    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    return {
        "message": "Threat alert created",
        "alert_id": new_alert.id
    }


# GET ALL ALERTS
@router.get("/alerts")
def get_alerts(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    alerts = db.query(ThreatAlert).all()

    return alerts

@router.post("/analyze-threat")
def analyze_security_threat(
    threat: ThreatInput,
    current_user: dict = Depends(get_current_user)
):

    result = classify_threat(
        threat.log_text
    )

    return result

@router.post("/upload-evidence")
def upload_evidence(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    upload_folder = "evidence_files"

    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(
        upload_folder,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    sha256_hash = generate_sha256(file_path)

    new_evidence = Evidence(
        filename=file.filename,
        file_hash=sha256_hash,
        uploaded_by=current_user["username"],
        notes="Initial forensic upload"
    )

    db.add(new_evidence)
    db.commit()
    db.refresh(new_evidence)

    return {
        "message": "Evidence uploaded successfully",
        "filename": file.filename,
        "sha256_hash": sha256_hash
    }

@router.get("/dashboard")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    total_alerts = db.query(ThreatAlert).count()

    critical_alerts = db.query(
        ThreatAlert
    ).filter(
        ThreatAlert.severity == "critical"
    ).count()

    high_alerts = db.query(
        ThreatAlert
    ).filter(
        ThreatAlert.severity == "high"
    ).count()

    total_evidence = db.query(Evidence).count()

    return {

        "analyst": current_user["username"],

        "total_alerts": total_alerts,

        "critical_alerts": critical_alerts,

        "high_alerts": high_alerts,

        "total_evidence_files": total_evidence
    }