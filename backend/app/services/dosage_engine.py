def determine_dosage_level(sync_state: str, mental_score: int, physical_score: int):
    """
    Returns:
        level (int): 1 or 2
        duration_seconds (int)
    """

    dissonance = abs(mental_score - physical_score)

    if sync_state == "stale":
        return 1, 60

    if dissonance > 35:
        return 2, 120

    return 1, 60
