from dataclasses import dataclass
from datetime import datetime
from uuid import uuid4


@dataclass(frozen=True)
class DosageDecision:
    id: str
    minutes: int
    reason: str
    engine_version: str
    created_at: datetime

    @staticmethod
    def create(minutes: int, reason: str, engine_version: str):
        return DosageDecision(
            id=str(uuid4()),
            minutes=minutes,
            reason=reason,
            engine_version=engine_version,
            created_at=datetime.utcnow(),
        )
