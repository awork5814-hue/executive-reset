export async function postBoxBreathingLog(params: {
  user_id: string;
  box_breathing_minutes: number;
  timestamp: string;
}) {
  fetch("http://localhost:8000/daily-log/box-breathing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).catch(() => {
    // silent failure (non-blocking UI)
  });
}
