from datetime import datetime
from uuid import uuid4


def recommend_duration(
    sync_state: str,
    mental_score: int,
    physical_score: int,
) -> dict:
    # Safety first
    if sync_state == "broken":
        minutes = 5
        reason = "Wearable data unavailable — conservative reset recommended."
    elif sync_state == "stale":
        minutes = 7
        reason = "Wearable data is stale — moderate reset suggested."
    else:
        avg = (mental_score + physical_score) / 2
        if avg <= 4:
            minutes = 10
            reason = "Low energy detected — longer reset advised."
        elif avg <= 7:
            minutes = 7
            reason = "Balanced state — standard reset duration."
        else:
            minutes = 5
            reason = "High readiness — short reset sufficient."

    return {
        "id": str(uuid4()),
        "minutes": minutes,
        "reason": reason,
        "engine_version": "v1",
        "created_at": datetime.utcnow(),
    }
