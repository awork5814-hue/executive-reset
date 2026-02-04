from datetime import datetime
from uuid import uuid4
from typing import Dict

from app.schemas.practice_session import (
    PracticeSessionCreate,
    PracticeSessionRead,
)


class PracticeStore:
    def __init__(self):
        self._sessions: Dict[str, PracticeSessionRead] = {}

    def create(self, payload: PracticeSessionCreate) -> PracticeSessionRead:
        session = PracticeSessionRead(
            id=uuid4(),
            theme=payload.theme,
            duration_minutes=payload.duration_minutes,
            created_at=datetime.utcnow(),
        )

        self._sessions[str(session.id)] = session
        return session

    def get(self, session_id: str) -> PracticeSessionRead | None:
        return self._sessions.get(session_id)


# ✅ THIS is what your API imports
practice_store = PracticeStore()
