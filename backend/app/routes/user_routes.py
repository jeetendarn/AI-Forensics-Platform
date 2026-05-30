from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from pydantic import BaseModel

from app.database import SessionLocal

from app.models import User

from app.auth import (
    hash_password,
    verify_password
)

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
# REQUEST MODELS
# =========================

class RegisterRequest(BaseModel):

    username: str

    email: str

    password: str


class LoginRequest(BaseModel):

    email: str

    password: str


# =========================
# REGISTER API
# =========================

@router.post("/register")

def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == request.email
    ).first()

    if existing_user:

        return {

            "message":
            "User already exists"
        }

    # HASH PASSWORD

    hashed_password = hash_password(
        request.password
    )

    user = User(

        username=request.username,

        email=request.email,

        password=hashed_password
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {

        "message":
        "Account created successfully"
    }


# =========================
# LOGIN API
# =========================

@router.post("/login")

def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == request.email
    ).first()

    if not user:

        return {

            "message":
            "Invalid email"
        }

    # VERIFY PASSWORD

    password_valid = verify_password(

        request.password,

        user.password
    )

    if not password_valid:

        return {

            "message":
            "Invalid password"
        }

    return {

        "message":
        "Login successful",

        "username":
        user.username,

        "email":
        user.email,

        "role":
        user.role
    }