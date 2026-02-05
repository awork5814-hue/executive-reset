from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.dosage_decision import DosageDecision

router = APIRouter(prefix="/dosage-history", tags=["Dosage History"])


@router.get("")
def get_dosage_history(db: Session = Depends(get_db)):
    return (
        db.query(DosageDecision)
        .order_by(DosageDecision.created_at.desc())
        .all()
    )
