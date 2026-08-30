import type { LocationInfo } from "../types";

interface LocationBadgeProps {
  location: LocationInfo;
  date: Date;
  showTimeZone: boolean;
}

export default function LocationBadge({
  location,
  date,
  showTimeZone,
}: LocationBadgeProps) {
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const offsetLabel =
    location.utcOffsetHours === 0
      ? "+0hrs"
      : `${location.utcOffsetHours > 0 ? "+" : ""}${location.utcOffsetHours}hrs`;

  const place = location.loading
    ? "Locating…"
    : location.city
      ? `${location.city}${location.country ? `, ${location.country}` : ""}`
      : location.timezone.replace("_", " ");

  return (
    <div className="w-full animate-fade-up [animation-delay:120ms] [animation-fill-mode:both]">
      {showTimeZone && (
        <div className="flex  items-center justify-center gap-2 text-white/80 text-sm sm:justify-start sm:text-base font-medium">
          <span
            className={`relative flex h-2 w-2 ${!location.loading ? "" : "animate-pulse-soft"}`}
            aria-hidden
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          {place}
        </div>
      )}
      <p className="text-white text-xs font-semibold sm:text-sm ">
        {dateLabel}
        {/* , {offsetLabel} */}
      </p>
    </div>
  );
}
