from fastapi import APIRouter
from app.services.wearable_store import wearable_store
from datetime import datetime
from app.services.wearable_store import wearable_store

from app.schemas.wearable_sync import WearableSyncIn, WearableSyncOut

router = APIRouter(
    prefix="/wearable",
    tags=["wearable"]
)


@router.post("/sync", response_model=WearableSyncOut)
def sync_wearable(payload: WearableSyncIn):
    wearable_store.update(payload.recorded_at)

    return WearableSyncOut(
        status="received",
        recorded_at=payload.recorded_at
    )


@router.get("/status")
def wearable_status():
    last = wearable_store.get_last()

    return {
        "last_recorded_at": last,
        "is_stale": wearable_store.is_stale(),
        "checked_at": datetime.utcnow()
    }
