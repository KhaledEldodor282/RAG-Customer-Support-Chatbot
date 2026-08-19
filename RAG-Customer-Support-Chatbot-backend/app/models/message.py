from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.core.database import Base
from sqlalchemy.orm import relationship
from app.Enum.senderEnum import SenderType
from sqlalchemy import Enum

class Message(Base):

    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True , autoincrement=True)

    conversation_id = Column(Integer, ForeignKey("conversation.id", ondelete="CASCADE"))
    ## user or bot
    sender = Column(Enum(SenderType), nullable=False)

    message = Column(String(5000), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    conversation = relationship("Conversation", back_populates="messages")