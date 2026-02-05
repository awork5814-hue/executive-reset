from enum import Enum

class SyncState(str, Enum):
    fresh = "fresh"
    stale = "stale"
    broken = "broken"
