from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from random import choice
from app.ai_engine.detector import classify_threat
from app.database import SessionLocal
from app.models import ThreatAlert
router = APIRouter()

# Database Dependency

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


THREATS = [

    {
        "title": "Malware Activity Detected",
        "description": "Suspicious executable behavior",
        "severity": "critical"
    },

    {
        "title": "Brute Force Login Attempt",
        "description": "Multiple failed login attempts",
        "severity": "high"
    },

    {
        "title": "Suspicious PowerShell Command",
        "description": "Encoded PowerShell execution",
        "severity": "medium"
    },

    {
        "title": "Unauthorized USB Access",
        "description": "Unknown removable device connected",
        "severity": "high"
    },

    {
        "title": "Possible Data Exfiltration",
        "description": "Large outbound traffic spike",
        "severity": "critical"
    }
]


@router.post("/simulate-threat")
def simulate_threat(
    db: Session = Depends(get_db)
):

    random_threat = choice(THREATS)

    alert = ThreatAlert(

        title=random_threat["title"],

        description=random_threat["description"],

        severity=classify_threat(
    random_threat["title"],
    random_threat["description"]
)
    )

    db.add(alert)

    db.commit()

    db.refresh(alert)

    return {
        "message": "Threat simulated",
        "alert": {
            "id": alert.id,
            "title": alert.title,
            "severity": alert.severity
        }
    }