from app.models.user import User
from sqlalchemy.orm import Session
from app.repositories import conversation_repository


def create_conversation(db: Session, current_user:User):
    user_id = current_user.id
    conversation = conversation_repository.create_conversation(db, user_id)
    return conversation


def get_user_conversation(db: Session,current_user:User):
    user_id = current_user.id
    return conversation_repository.get_user_conversation(db, user_id)


def get_conversation_by_id(db: Session,conversation_id):
        return conversation_repository.get_conversation_by_id(db, conversation_id)




def delete_conversation(db: Session, conversation_id: int):
    return conversation_repository.delete_conversation(db, conversation_id)


def delete_all_conversations(db: Session,current_user:User):
    user_id = current_user.id
    conversation_repository.delete_all_conversations(db, user_id)
    return {
        "message": "History Cleared Successfully"
    }