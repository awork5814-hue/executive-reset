from fastapi import FastAPI
from app.api.dosage_preview import router as dosage_router
from app.api.practice import router as practice_router

from app.api.daily_log import router as daily_log_router
from app.api.wearable_sync import router as wearable_sync_router

app = FastAPI(title="Executive Reset API")

app.include_router(daily_log_router)
app.include_router(wearable_sync_router)
app.include_router(dosage_router)
app.include_router(practice_router, prefix="/practice")