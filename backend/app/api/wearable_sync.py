from fastapi import APIRouter
from datetime import datetime, timedelta

from app.schemas.wearable_sync import WearableSyncPayload

router = APIRouter(prefix="/wearable-sync", tags=["Wearables"])


@router.post("")
def sync_wearable(data: WearableSyncPayload):
    now = datetime.utcnow()
    age = now - data.timestamp

    if age > timedelta(hours=4):
        sync_state = "stale"
    else:
        sync_state = "fresh"

    return {
        "user_id": data.user_id,
        "sync_state": sync_state,
        "received": {
            "steps": data.steps,
            "sleep_minutes": data.sleep_minutes,
            "hrv": data.heart_rate_variability,
        },
        "message": "Wearable data synced"
    }
