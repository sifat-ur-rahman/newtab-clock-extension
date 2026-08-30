interface DigitalClock24Props {
  date: Date;
  showSeconds?: boolean;
}

export default function DigitalClock24({
  date,
  showSeconds = true,
}: DigitalClock24Props) {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  return (
    <div className="animate-fade-up [animation-delay:200ms] [animation-fill-mode:both] mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm sm:mx-0">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50 sm:text-xs">
        24H
      </span>

      <span className="font-display text-sm font-medium tabular-nums text-white/85 sm:text-base">
        {h}:{m}
        {/* {showSeconds && `:${s}`} */}
      </span>
    </div>
  );
}
