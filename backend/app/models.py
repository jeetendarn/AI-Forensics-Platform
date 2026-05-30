from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Text
)

from datetime import datetime

from app.database import Base


# =========================
# USER MODEL
# =========================

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True,
        index=True
    )

    email = Column(
        String,
        unique=True,
        index=True
    )

    password = Column(String)

    role = Column(
        String,
        default="analyst"
    )


# =========================
# ALERT MODEL
# =========================

class ThreatAlert(Base):

    __tablename__ = "threat_alerts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(String)

    description = Column(String)

    severity = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


# =========================
# EVIDENCE MODEL
# =========================

class Evidence(Base):

    __tablename__ = "evidence"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    filename = Column(String)

    file_hash = Column(String)

    uploaded_by = Column(String)

    notes = Column(Text)

    threat_score = Column(
        Integer,
        default=0
    )

    ai_verdict = Column(
        String,
        default="Safe"
    )

    severity = Column(
        String,
        default="low"
    )

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )