from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PracticeSession(BaseModel):
    session_id: str
    user_id: str
    type: str
    dosage_level: int
    duration_seconds: int
    resonance_score: Optional[int] = None
    created_at: datetime
