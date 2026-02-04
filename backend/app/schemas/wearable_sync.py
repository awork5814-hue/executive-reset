from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class WearableSyncPayload(BaseModel):
    user_id: str
    steps: Optional[int] = None
    sleep_minutes: Optional[int] = None
    heart_rate_variability: Optional[float] = None
    timestamp: datetime
