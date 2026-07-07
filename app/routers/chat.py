from app.models.user import User
from app.services import chat_service
from fastapi import APIRouter
from app.schemas.chat_schema import ChatRequest
from sqlalchemy.orm import Session
from app.core.database import get_db
from fastapi import Depends
from app.auth.dependencies import get_current_user
from fastapi.security import HTTPBearer

security = HTTPBearer()


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

@router.post("/")
def chat(request: ChatRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return chat_service.send_message(db, request.conversation_id, request.user_message, "user", current_user)