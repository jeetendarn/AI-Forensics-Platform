from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str

class AlertCreate(BaseModel):
    title: str
    description: str
    severity: str

class ThreatInput(BaseModel):
    log_text: str    