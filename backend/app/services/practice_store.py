from uuid import uuid4
from datetime import datetime
from typing import List

class PracticeStore:
    def __init__(self):
        self.sessions = []

    def create(self, session):
        record = {
            "id": uuid4(),
            "theme": session.theme,
            "duration_minutes": session.duration_minutes,
            "created_at": datetime.utcnow(),
        }
        self.sessions.append(record)
        return record

    def list(self) -> List[dict]:
        return self.sessions


practice_store = PracticeStore()
