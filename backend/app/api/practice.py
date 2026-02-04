from fastapi import APIRouter
from uuid import uuid4
from datetime import datetime

from app.schemas.practice import PracticeStartRequest
from app.schemas.practice_session import PracticeSession
from app.services.practice_store import save_practice_session

router = APIRouter()

@router.post("/start")
def start_practice(payload: PracticeStartRequest):

    # Default dosage
    dosage_level = 1
    duration_seconds = 60

    # Dosage escalation
    if payload.dissonance_flag is True:
        dosage_level = 2
        duration_seconds = 120
    elif payload.sync_state == "stale":
        dosage_level = 2
        duration_seconds = 120

    # Create session record
    session = PracticeSession(
        session_id=str(uuid4()),
        user_id="UUID-123",  # stubbed for Sprint 1
        type="box_breathing",
        dosage_level=dosage_level,
        duration_seconds=duration_seconds,
        resonance_score=None,
        created_at=datetime.utcnow()
    )

    save_practice_session(session)

    return session
