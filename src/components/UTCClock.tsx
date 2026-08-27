interface UTCClockProps {
  date: Date;
}

export default function UTCClock({ date }: UTCClockProps) {
  const h = date.getUTCHours().toString().padStart(2, "0");
  const m = date.getUTCMinutes().toString().padStart(2, "0");
  const s = date.getUTCSeconds().toString().padStart(2, "0");

  return (
    <div className="animate-fade-up [animation-delay:200ms] [animation-fill-mode:both] mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm sm:mx-0">
      <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-white/50 uppercase">
        UTC
      </span>
      <span className="font-display text-sm sm:text-base font-medium text-white/85 tabular-nums">
        {h}:{m}:{s}
      </span>
    </div>
  );
}
