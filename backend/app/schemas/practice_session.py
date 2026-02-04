from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional


# -------------------------
# Base shared fields
# -------------------------
class PracticeSessionBase(BaseModel):
    theme: str
    duration_minutes: int


# -------------------------
# Create (input)
# -------------------------
class PracticeSessionCreate(PracticeSessionBase):
    pass


# -------------------------
# Read (output)
# -------------------------
class PracticeSessionRead(PracticeSessionBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
