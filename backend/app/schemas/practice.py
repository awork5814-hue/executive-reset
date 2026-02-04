from pydantic import BaseModel
from typing import Literal
from app.services.practice_store import practice_store


class PracticeStartRequest(BaseModel):
    sync_state: Literal["fresh", "stale"]
    dissonance_flag: bool
