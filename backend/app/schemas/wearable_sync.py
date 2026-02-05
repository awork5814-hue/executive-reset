from pydantic import BaseModel
from datetime import datetime


class WearableSyncIn(BaseModel):
    recorded_at: datetime
    stress_level: int  # 0–100
    readiness: int     # 0–100


class WearableSyncOut(BaseModel):
    status: str
    recorded_at: datetime
