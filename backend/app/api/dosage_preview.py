from fastapi import APIRouter
from app.services.dosage_engine import recommend_duration

router = APIRouter(prefix="/dosage-preview", tags=["Dosage Preview"])





@router.get("")
def dosage_preview(
    sync_state: str,
    mental_score: int,
    physical_score: int,
):
    decision = recommend_duration(
        sync_state=sync_state,
        mental_score=mental_score,
        physical_score=physical_score,
    )

    return {
        "recommended_minutes": decision["minutes"],
        "reason": decision["reason"],
        "sync_state": sync_state,   # ← use the input, not the engine
    }
