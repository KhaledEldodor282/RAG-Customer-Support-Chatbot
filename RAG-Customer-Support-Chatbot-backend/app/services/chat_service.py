from app.models.user import User
from app.services import conversation_service
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.repositories import message_repository, conversation_repository
from app.AI.rag_service import ask

def send_message(db: Session, conversation_id: int| None, message: str, sender: str,current_user:User):
  
    if conversation_id is None:
        conversation = conversation_service.create_conversation(db, current_user)
        conversation_id = conversation.id
    
    else:
        conversation = conversation_service.get_conversation_by_id(db, conversation_id)
    
    message_repository.create_message(db=db, conversation_id=conversation_id, message=message, sender="user")

    rag_response=ask(message)
    answer=rag_response["answer"]

    message_repository.create_message(db=db, conversation_id=conversation_id, message=answer, sender="bot")

    return {
        "message": answer,
        "conversation_id": conversation_id,
        "retrieved_documents": rag_response["retrieved_documents"].to_dict(orient="records")

    }