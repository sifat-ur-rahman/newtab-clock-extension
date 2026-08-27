import { useEffect, useState } from "react";

/**
 * Ticks once per second and returns the current Date.
 * Uses a self-correcting timeout (instead of setInterval) so the
 * clock doesn't drift out of sync with the wall clock over time.
 */
export function useClock(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timeoutId: number;

    const tick = () => {
      const current = new Date();
      setNow(current);
      const msUntilNextSecond = 1000 - current.getMilliseconds();
      timeoutId = window.setTimeout(tick, msUntilNextSecond);
    };

    tick();
    return () => window.clearTimeout(timeoutId);
  }, []);

  return now;
}
