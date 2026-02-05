from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.dosage_decision import DosageDecision
from app.schemas.dosage_decision import (
    DosageDecisionCreate,
    DosageDecisionRead,
)

router = APIRouter(
    prefix="/dosage-confirm",
    tags=["Dosage"]
)


@router.post("", response_model=DosageDecisionRead)
def confirm_dosage(
    payload: DosageDecisionCreate,
    db: Session = Depends(get_db),
):
    decision = DosageDecision(**payload.model_dump())

    db.add(decision)
    db.commit()
    db.refresh(decision)

    return decision
