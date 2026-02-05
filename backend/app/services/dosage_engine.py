from app.services import dosage_engine_v1


def recommend_duration(
    sync_state: str,
    mental_score: int,
    physical_score: int,
):
    return dosage_engine_v1.recommend_duration(
        sync_state=sync_state,
        mental_score=mental_score,
        physical_score=physical_score,
    )
