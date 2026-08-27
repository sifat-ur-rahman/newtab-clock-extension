import { useMemo } from "react";

interface AnalogClockProps {
  date: Date;
  size?: number;
}

export default function AnalogClock({ date, size = 168 }: AnalogClockProps) {
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ms = date.getMilliseconds();

  const secondDeg = (seconds + ms / 1000) * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  const numbers = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const radius = size / 2;
  const numberRadius = radius * 0.78;

  return (
    <div
      className="relative shrink-0 animate-fade-up"
      style={{ width: size, height: size }}
      aria-label="Analog clock"
      role="img"
    >
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="overflow-visible">
        {/* Face */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - 2}
          fill="var(--color-surface)"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth={1.5}
        />

        {/* Hour numbers */}
        {numbers.map((n) => {
          const angle = (n / 12) * 2 * Math.PI - Math.PI / 2;
          const x = radius + numberRadius * Math.cos(angle);
          const y = radius + numberRadius * Math.sin(angle);
          return (
            <text
              key={n}
              x={x}
              y={y}
              fill="rgba(255,255,255,0.85)"
              fontSize={size * 0.075}
              fontWeight={600}
              fontFamily="'Space Grotesk', ui-sans-serif, sans-serif"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {n}
            </text>
          );
        })}

        {/* Minute hand */}
        <line
          x1={radius}
          y1={radius}
          x2={radius}
          y2={radius - radius * 0.62}
          stroke="rgba(255,255,255,0.92)"
          strokeWidth={size * 0.024}
          strokeLinecap="round"
          style={{
            transform: `rotate(${minuteDeg}deg)`,
            transformOrigin: `${radius}px ${radius}px`,
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Hour hand */}
        <line
          x1={radius}
          y1={radius}
          x2={radius}
          y2={radius - radius * 0.42}
          stroke="rgba(255,255,255,0.92)"
          strokeWidth={size * 0.032}
          strokeLinecap="round"
          style={{
            transform: `rotate(${hourDeg}deg)`,
            transformOrigin: `${radius}px ${radius}px`,
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Second hand */}
        <line
          x1={radius}
          y1={radius + radius * 0.14}
          x2={radius}
          y2={radius - radius * 0.68}
          stroke="var(--color-accent)"
          strokeWidth={size * 0.012}
          strokeLinecap="round"
          style={{
            transform: `rotate(${secondDeg}deg)`,
            transformOrigin: `${radius}px ${radius}px`,
            transition: ms < 100 ? "none" : "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Center pin */}
        <circle cx={radius} cy={radius} r={size * 0.025} fill="var(--color-accent)" />
      </svg>
    </div>
  );
}
