from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class DosageDecisionCreate(BaseModel):
    sync_state: str
    mental_score: int
    physical_score: int
    recommended_minutes: int
    reason: str


class DosageDecisionRead(DosageDecisionCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
