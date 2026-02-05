from app.db.session import engine
from app.db.base import Base
from app.models import dosage_decision  # noqa

def init_db():
    Base.metadata.create_all(bind=engine)
