from datetime import datetime

def confirm_dosage(decision):
    return {
        "minutes": decision.minutes,
        "reason": decision.reason,
        "sync_state": decision.sync_state,
        "confirmed_at": datetime.utcnow(),
    }
