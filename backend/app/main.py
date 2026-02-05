from fastapi import FastAPI

from app.api.daily_log import router as daily_log_router
from app.api.wearable_sync import router as wearable_sync_router
from app.api.dosage_preview import router as dosage_preview_router
from app.api.dosage_confirm import router as dosage_confirm_router
from app.api.practice import router as practice_router
from app.api.dosage_history import router as dosage_history_router

app = FastAPI(title="Executive Reset API")

# Core features
app.include_router(daily_log_router)
app.include_router(wearable_sync_router)

# Dosage flow
app.include_router(dosage_preview_router)
app.include_router(dosage_confirm_router)

# Practice
app.include_router(practice_router, prefix="/practice")
app.include_router(dosage_preview_router)
app.include_router(dosage_confirm_router)
app.include_router(dosage_history_router)
