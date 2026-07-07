from huggingface_hub import User

from app.auth.dependencies import get_current_user
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.login_schema import RegisterRequest, LoginRequest
from app.services import user_service


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/login")
def login(user: LoginRequest, db: Session = Depends(get_db)):
    return user_service.login_user(db, user)


@router.post("/register")
def register(user: RegisterRequest, db: Session = Depends(get_db)):
    return user_service.register_user(db, user)

@router.post("/delete")
def delete( db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return user_service.delete_user(db, current_user)

@router.post("/logout")
def logout( db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return user_service.logout_user(current_user)


