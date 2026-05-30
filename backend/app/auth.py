# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from pydantic import BaseModel

# from app.database import SessionLocal
# from app.models import User

# router = APIRouter()

# # =========================
# # DATABASE
# # =========================

# def get_db():

#     db = SessionLocal()

#     try:
#         yield db

#     finally:
#         db.close()

# # =========================
# # REQUEST MODELS
# # =========================

# class RegisterRequest(BaseModel):

#     username: str

#     email: str

#     password: str

# class LoginRequest(BaseModel):

#     email: str

#     password: str

# # =========================
# # REGISTER
# # =========================

# @router.post("/register")

# def register(
#     request: RegisterRequest,
#     db: Session = Depends(get_db)
# ):

#     existing_user = db.query(User).filter(
#         User.email == request.email
#     ).first()

#     if existing_user:

#         return {
#             "message":
#             "User already exists"
#         }

#     # hashed_password = hash_password(
#     #     request.password
#     # )

#     new_user = User(

#         username=request.username,

#         email=request.email,

#         password=hashed_password
#     )

#     db.add(new_user)

#     db.commit()

#     db.refresh(new_user)

#     return {

#         "message":
#         "Account created successfully"
#     }

# # =========================
# # LOGIN
# # =========================

# @router.post("/login")

# def login(
#     request: LoginRequest,
#     db: Session = Depends(get_db)
# ):

#     user = db.query(User).filter(
#         User.email == request.email
#     ).first()

#     if not user:

#         return {
#             "message":
#             "Invalid email"
#         }

#     valid_password = verify_password(
#         request.password,
#         user.password
#     )

#     if not valid_password:

#         return {
#             "message":
#             "Invalid password"
#         }

#     return {

#         "message":
#         "Login successful",

#         "username":
#         user.username,

#         "email":
#         user.email
#     }

from passlib.context import CryptContext

# =========================
# PASSWORD HASHING
# =========================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# =========================
# HASH PASSWORD
# =========================

def hash_password(password: str):

    return pwd_context.hash(password)

# =========================
# VERIFY PASSWORD
# =========================

def verify_password(
    plain_password: str,
    hashed_password: str
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )

# =========================
# CURRENT USER
# =========================

def get_current_user():

    return {

        "username": "admin",

        "role": "admin"
    }