from fastapi import FastAPI
from app.core.database import Base, engine
from app.routers import authentication, history, chat


app = FastAPI()

app.include_router(authentication.router)
app.include_router(chat.router)
app.include_router(history.router)


Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {
        "message": "Customer Support Chatbot API is Running"
    }