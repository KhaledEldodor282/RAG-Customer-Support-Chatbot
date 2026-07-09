from pydantic import BaseModel

class ChatRequest(BaseModel):
    conversation_id: int | None = None
    user_message: str


class ChatResponse(BaseModel):
    message: str
    conversation_id: int