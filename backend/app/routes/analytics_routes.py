from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import SessionLocal
from app.models import ThreatAlert

router = APIRouter()


# =========================
# DATABASE DEPENDENCY
# =========================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================
# ANALYTICS API
# =========================

@router.get("/analytics")

def get_analytics(
    db: Session = Depends(get_db)
):

    total_alerts = db.query(
        ThreatAlert
    ).count()


    critical_count = db.query(
        ThreatAlert
    ).filter(
        ThreatAlert.severity == "critical"
    ).count()


    high_count = db.query(
        ThreatAlert
    ).filter(
        ThreatAlert.severity == "high"
    ).count()


    medium_count = db.query(
        ThreatAlert
    ).filter(
        ThreatAlert.severity == "medium"
    ).count()


    low_count = db.query(
        ThreatAlert
    ).filter(
        ThreatAlert.severity == "low"
    ).count()


    return {

        "total_alerts": total_alerts,

        "severity_distribution": [

            {
                "name": "Critical",
                "value": critical_count
            },

            {
                "name": "High",
                "value": high_count
            },

            {
                "name": "Medium",
                "value": medium_count
            },

            {
                "name": "Low",
                "value": low_count
            }
        ]
    }