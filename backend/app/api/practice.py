from fastapi import APIRouter
from app.schemas.practice_session import (
    PracticeSessionCreate,
    PracticeSessionRead,
)
from app.services.practice_store import practice_store

router = APIRouter(
    prefix="",
    tags=["practice"]
)


@router.post("/start", response_model=PracticeSessionRead)
def start_practice(payload: PracticeSessionCreate):
    session = practice_store.create(payload)
    return session



@router.get(
    "",
    response_model=list[PracticeSessionRead]
)
def list_practice_sessions():
    return practice_store.list()


