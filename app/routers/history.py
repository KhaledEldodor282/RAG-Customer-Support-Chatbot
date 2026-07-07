from app.core.database import get_db
from fastapi import APIRouter
from app.models.user import User
from app.schemas.conversation_schema import ConversationResponse
from app.services import history_service
from sqlalchemy.orm import Session
from fastapi import Depends
from app.auth.dependencies import get_current_user
from fastapi.security import HTTPBearer

security = HTTPBearer()



router = APIRouter(
    prefix="/history",
    tags=["History"]
)

@router.get("/all")
def history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user), response_model=list[ConversationResponse]):
    return history_service.get_all_history(db, current_user)

@router.get("/{conversation_id}")
def get_history_by_id(conversation_id: int, db: Session = Depends(get_db), response_model=ConversationResponse):
    return history_service.get_history_by_id(db, conversation_id)

@router.delete("/{conversation_id}")
def delete_conversation(conversation_id: int, db: Session = Depends(get_db),):
    return history_service.delete_conversation(db, conversation_id)

@router.post("/clear")
def clear_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return history_service.delete_all_history(db, current_user)


