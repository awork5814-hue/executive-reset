import { useEffect, useState } from "react";
import "../styles/practice.css";

type Phase = "INHALE" | "HOLD" | "EXHALE";

export default function Practice() {
  const [phase, setPhase] = useState<Phase>("INHALE");
  const [fill, setFill] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "INHALE") {
      setFill(100);
      timeout = setTimeout(() => setPhase("HOLD"), 4000);
    }

    if (phase === "HOLD") {
      timeout = setTimeout(() => setPhase("EXHALE"), 2000);
    }

    if (phase === "EXHALE") {
      setFill(0);
      timeout = setTimeout(() => setPhase("INHALE"), 4000);
    }

    return () => clearTimeout(timeout);
  }, [phase, running]);

  return (
    <div className="practice">
      <div className="orb-wrapper">

        <div className="orb">
          <div
            className="orb-fill"
            style={{ height: `${fill}%` }}
          />
        </div>

        <div className="phase-label">
          {phase}
        </div>

        <button
          className="play-button"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "❚❚" : "▶"}
        </button>

      </div>
    </div>
  );
}
