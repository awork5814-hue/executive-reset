import { useEffect, useRef, useState } from "react";

type Phase = "inhale" | "hold" | "exhale" | "hold2";

const PHASES: { type: Phase; duration: number }[] = [
  { type: "inhale", duration: 4000 },
  { type: "hold", duration: 4000 },
  { type: "exhale", duration: 4000 },
  { type: "hold2", duration: 4000 },
];

const SESSION_DURATION = 60_000;
const TARGET_SCORE = 94;

export default function BreathingExercise() {
  const [started, setStarted] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);

  const rafRef = useRef<number>(0);
  const phaseStartRef = useRef(0);
  const sessionStartRef = useRef(0);

  /* ===============================
     Breathing animation loop
     =============================== */
  useEffect(() => {
    if (!started || sessionComplete) return;

    phaseStartRef.current = performance.now();
    sessionStartRef.current = performance.now();

    const loop = (now: number) => {
      const phase = PHASES[phaseIndex];
      const elapsed = now - phaseStartRef.current;
      const progress = Math.min(elapsed / phase.duration, 1);

      setPhaseProgress(progress);

      if (elapsed >= phase.duration) {
        phaseStartRef.current = now;
        setPhaseIndex((i) => (i + 1) % PHASES.length);
      }

      if (now - sessionStartRef.current >= SESSION_DURATION) {
        setStarted(false);
        setSessionComplete(true);
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [started, phaseIndex, sessionComplete]);

  /* ===============================
     Score count-up animation
     =============================== */
  useEffect(() => {
    if (!sessionComplete) return;

    let start: number | null = null;

    const animate = (t: number) => {
      if (!start) start = t;
      const progress = Math.min((t - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedScore(Math.round(eased * TARGET_SCORE));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [sessionComplete]);

  /* ===============================
     Visual state
     =============================== */
  const phase = PHASES[phaseIndex].type;

  const scale =
    phase === "inhale"
      ? 1 + phaseProgress * 0.25
      : phase === "exhale"
      ? 1.25 - phaseProgress * 0.25
      : 1.25;

  const color =
    phase === "inhale"
      ? "#2563EB"
      : phase === "exhale"
      ? "#22C55E"
      : "#1D4ED8";

  /* ===============================
     Session Complete Screen
     =============================== */
  if (sessionComplete) {
    return (
      <div style={styles.screen}>
        <div style={styles.check}>✓</div>
        <h1>Session Complete</h1>
        <p style={styles.sub}>Great job synchronizing your rhythm.</p>

        <div style={styles.card}>
          <span style={styles.label}>RESONANCE SCORE</span>
          <div style={styles.score}>{animatedScore}</div>
        </div>

        <button style={styles.primary} onClick={() => window.history.back()}>
          Done
        </button>
      </div>
    );
  }

  /* ===============================
     Breathing Screen
     =============================== */
  return (
    <div style={styles.screen}>
      <div
        style={{
          ...styles.circle,
          background: color,
          transform: `scale(${scale})`,
        }}
      >
        READY
      </div>

      <p style={styles.sub}>Sync your breath with the circle.</p>

      {!started && (
        <button style={styles.play} onClick={() => setStarted(true)}>
          ▶
        </button>
      )}
    </div>
  );
}

/* ===============================
   Styles
   =============================== */
const styles: Record<string, React.CSSProperties> = {
  screen: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0B1220, #020617)",
    color: "#E5E7EB",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    transition: "transform 0.1s linear, background 0.3s ease",
  },
  play: {
    marginTop: 24,
    width: 64,
    height: 64,
    borderRadius: "50%",
    border: "none",
    background: "#2563EB",
    color: "white",
    fontSize: 24,
    cursor: "pointer",
  },
  check: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "#22C55E",
    color: "#020617",
    fontSize: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    background: "rgba(255,255,255,0.05)",
  },
  label: { fontSize: 12, color: "#60A5FA" },
  score: { fontSize: 48, fontWeight: 700 },
  primary: {
    marginTop: 24,
    padding: 14,
    width: 280,
    borderRadius: 12,
    background: "#2563EB",
    border: "none",
    color: "white",
    fontWeight: 600,
  },
  sub: { color: "#9CA3AF", marginTop: 16 },
};
