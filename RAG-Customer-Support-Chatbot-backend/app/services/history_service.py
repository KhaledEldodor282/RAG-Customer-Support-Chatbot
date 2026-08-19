from app.models.user import User
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.services import conversation_service
from app.repositories import message_repository


def get_all_history(db: Session,current_user: User):
    return conversation_service.get_user_conversation(db, current_user)


def get_history_by_id(db: Session, conversation_id: int):
    conversation = conversation_service.get_conversation_by_id(db, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    messages= message_repository.get_conversation_messages(db, conversation_id)
    return {
        "conversation": conversation,
    }


def delete_conversation(db: Session, conversation_id: int): 
    return conversation_service.delete_conversation(db, conversation_id)


def delete_all_history(db: Session,current_user:User):
    return conversation_service.delete_all_conversations(db,current_user)