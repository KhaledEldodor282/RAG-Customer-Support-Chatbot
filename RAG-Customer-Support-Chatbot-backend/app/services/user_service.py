from app.models.user import User
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.auth.password import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.repositories import user_repository
from app.schemas.login_schema import LoginRequest, RegisterRequest
from app.auth.dependencies import get_current_user


def register_user(db: Session, user: RegisterRequest):
    existing_user = user_repository.get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(status_code=409, detail="User already exists")
    
    user = RegisterRequest(username=user.username, email=user.email, password=user.password)
    user.password = hash_password(user.password)

    new_user = User(
    username=user.username,
    email=user.email,
    password=user.password
)

    return user_repository.create_user(db, new_user)



def login_user(db: Session, user: LoginRequest):
    existing_user = user_repository.get_user_by_email(db, user.email)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not verify_password(user.password, existing_user.password):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    access_token = create_access_token(
        {
            "user_id": existing_user.id,
            "email": existing_user.email,
            "username": existing_user.username
        }
    )
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


def delete_user(db: Session):

    email=get_current_user().email
    existing_user = user_repository.get_user_by_email(db, email)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user_repository.delete_user(db, existing_user.email)


def logout_user():
    return{
        "message": "Logout successful"
    }