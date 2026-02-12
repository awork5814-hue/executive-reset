import { useState } from "react"
import { updateLoad } from "../logic/loadModel"
import type { LoadState } from "../logic/loadModel"

const INITIAL_LOAD: LoadState = {
  mental: 50,
  physical: 50,
}

export function useRegulationState() {
  const [load, setLoad] = useState<LoadState>(INITIAL_LOAD)

  function applyCheckIn(
    input: Parameters<typeof updateLoad>[1]
  ) {
    setLoad((prev) => updateLoad(prev, input))
  }

  return {
    load,
    mentalScore: 100 - load.mental,
    physicalScore: 100 - load.physical,
    applyCheckIn,
  }
}
