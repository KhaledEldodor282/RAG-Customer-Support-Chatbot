from pydantic import BaseModel
from datetime import datetime
from .message_schema import MessageResponse

class ConversationResponse(BaseModel):
    id: int
    created_at: datetime
    messages: list[MessageResponse]

    class Config:
        from_attributes = True