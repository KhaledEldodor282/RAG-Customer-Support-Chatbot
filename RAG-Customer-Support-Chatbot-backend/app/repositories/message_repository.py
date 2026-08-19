from sqlalchemy.orm import Session
from app.models.message import Message
from app.Enum.senderEnum import SenderType



def create_message(db: Session, conversation_id: int, message: str, sender: SenderType):
    message = Message(
        conversation_id=conversation_id,
        message=message,
        sender=sender
        )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def get_conversation_messages(db: Session, conversation_id: int):
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
        .all()
    )

