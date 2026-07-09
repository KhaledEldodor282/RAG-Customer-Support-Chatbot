from sqlalchemy.orm import Session
from app.models.conversation import Conversation
from app.models.message import Message
from sqlalchemy.orm import joinedload


def create_conversation(db: Session, user_id: int):
    conversation = Conversation(user_id=user_id)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation


def get_conversation_by_id(db: Session, conversation_id: int):
    return db.query(Conversation).options(joinedload(Conversation.messages)).filter(Conversation.id == conversation_id).first()


def get_user_conversation(db: Session, user_id: int):
      return (
        db.query(Conversation)
        .options(joinedload(Conversation.messages))
        .filter(Conversation.user_id == user_id)
        .order_by(Conversation.created_at.desc())
        .all()
    )


def delete_conversation(db: Session,conversation_id: int):

    conversation = get_conversation_by_id(db,conversation_id)

    if conversation is None:
        return None

    db.delete(conversation)
    db.commit()

    return {
        "message": "Conversation Deleted Successfully"
    }



def delete_all_conversations(db: Session, user_id:int):
    conversations = (
        db.query(Conversation)
        .filter(Conversation.user_id == user_id)
        .all()
    )

    for conversation in conversations:
          db.delete(conversation)

    db.commit()
    