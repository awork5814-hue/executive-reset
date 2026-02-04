from fastapi import APIRouter
from app.services.dosage_engine import determine_dosage_level

router = APIRouter(prefix="/dosage-preview", tags=["Dosage"])


@router.get("")
def preview_dosage(
    sync_state: str,
    mental_score: int,
    physical_score: int
):
    level, duration = determine_dosage_level(
        sync_state, mental_score, physical_score
    )

    return {
        "dosage_level": level,
        "duration_seconds": duration
    }
