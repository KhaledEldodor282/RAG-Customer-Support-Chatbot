import logging

from fastapi import FastAPI
from routes.query import router as query_router
from routes.health import router as health_router
from middleware.auth import APIKeyMiddleware
from rag.inference import load_components

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="RAG Customer Support API")

app.add_middleware(APIKeyMiddleware)

app.include_router(query_router, prefix="/api/v1")
app.include_router(health_router, prefix="/api/v1")


@app.on_event("startup")
def startup_event():
    # Load FAISS index, TF-IDF/SVD models, and TinyLlama ONCE when the
    # container starts, not on every request. This takes a while on first
    # boot (model download + load) — App Service health checks should
    # allow enough warm-up time before marking the instance healthy.
    load_components()


# POST /api/v1/query
# Body: { "question": "Where is my order?" }
# Response: { "answer": "...", "sources": [...] }
