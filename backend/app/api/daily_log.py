from fastapi import APIRouter
from app.schemas.daily_log import DailyLogCreate
from app.core.security import encrypt_int
from datetime import datetime

router = APIRouter()


@router.post("/daily-log")
def create_daily_log(payload: DailyLogCreate):
    day_key = payload.timestamp.date().isoformat()

    encrypted_mood = encrypt_int(payload.mood)
    encrypted_energy = encrypt_int(payload.energy)

    return {
        "user_id": payload.user_id,
        "day": day_key,
        "mood_encrypted": encrypted_mood,
        "energy_encrypted": encrypted_energy,
        "sync_state": "partial",
        "message": "Daily log recorded (encrypted)"
    }
