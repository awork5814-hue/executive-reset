from pydantic import BaseModel
from datetime import datetime


class DailyLogCreate(BaseModel):
    user_id: str
    mood: int
    energy: int
    timestamp: datetime
