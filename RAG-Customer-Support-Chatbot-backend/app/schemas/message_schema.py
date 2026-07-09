from pydantic import BaseModel
from datetime import datetime

class MessageResponse(BaseModel):
    id: int
    sender: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True