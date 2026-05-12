from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import database

app = FastAPI()

# CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    username: str
    message: str

@app.on_event("startup")
async def startup():
    database.init_db()

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/messages")
async def get_messages():
    messages = database.get_messages()
    return {"messages": messages}

@app.post("/api/messages")
async def post_message(msg: Message):
    if not msg.username or not msg.message:
        raise HTTPException(status_code=400, detail="Username and message required")

    database.add_message(msg.username, msg.message)
    return {"status": "success"}
