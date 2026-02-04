from typing import List
from app.schemas.practice_session import PracticeSession

practice_sessions: List[PracticeSession] = []


def save_practice_session(session: PracticeSession):
    practice_sessions.append(session)
    return session
