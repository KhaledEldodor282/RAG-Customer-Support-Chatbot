from fastapi import APIRouter
from pydantic import BaseModel

from rag.inference import ask

router = APIRouter()


class QueryRequest(BaseModel):
    question: str
    top_k: int = 5


class QueryResponse(BaseModel):
    answer: str
    sources: list[str] = []


@router.post("/query", response_model=QueryResponse)
def query(request: QueryRequest):
    result = ask(request.question, top_k=request.top_k)
    return QueryResponse(answer=result["answer"], sources=result["sources"])
