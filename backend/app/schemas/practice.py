from pydantic import BaseModel
from typing import Literal


class PracticeStartRequest(BaseModel):
    sync_state: Literal["fresh", "stale"]
    dissonance_flag: bool
