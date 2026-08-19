from sqlalchemy import Column, Integer, String
from app.core.database import Base
from sqlalchemy.orm import relationship


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    username = Column(String(50), nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    password = Column(String(500), nullable=False)

    conversations = relationship("Conversation", back_populates="user", cascade="all, delete")