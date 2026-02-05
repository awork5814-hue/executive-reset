from datetime import datetime, timedelta
from typing import Optional


STALE_AFTER_MINUTES = 30


class WearableStore:
    def __init__(self):
        self.last_recorded_at: Optional[datetime] = None

    def update(self, recorded_at: datetime):
        self.last_recorded_at = recorded_at

    def get_last(self) -> Optional[datetime]:
        return self.last_recorded_at

    def is_stale(self, now: Optional[datetime] = None) -> bool:
        if self.last_recorded_at is None:
            return True

        if now is None:
            now = datetime.utcnow()

        return now - self.last_recorded_at > timedelta(minutes=STALE_AFTER_MINUTES)


wearable_store = WearableStore()
