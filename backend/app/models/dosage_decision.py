from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.db.base import Base


class DosageDecision(Base):
    __tablename__ = "dosage_decisions"

    id = Column(Integer, primary_key=True, index=True)
    sync_state = Column(String, nullable=False)
    mental_score = Column(Integer, nullable=False)
    physical_score = Column(Integer, nullable=False)
    recommended_minutes = Column(Integer, nullable=False)
    reason = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
