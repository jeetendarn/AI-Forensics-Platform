from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# ROUTES
from app.routes.blockchain_routes import router as blockchain_router
from app.routes.user_routes import router as user_router
from app.routes.alert_routes import router as alert_router
from app.routes.analytics_routes import router as analytics_router
from app.routes.evidence_routes import router as evidence_router
from app.routes.auth_routes import router as auth_router
# CREATE DATABASE TABLES

Base.metadata.create_all(bind=engine)

app = FastAPI()

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================
# ROUTES
# =========================

app.include_router(user_router)

app.include_router(alert_router)

app.include_router(analytics_router)

app.include_router(evidence_router)
app.include_router(auth_router)
app.include_router(blockchain_router)
# =========================
# ROOT
# =========================

@app.get("/")

def root():

    return {

        "message":
        "AI Forensics Platform Running"
    }