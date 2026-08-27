interface DigitalClockProps {
  date: Date;
  showSeconds?: boolean;
}

export default function DigitalClock({ date, showSeconds = true }: DigitalClockProps) {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const period = hours24 >= 12 ? "PM" : "AM";

  return (
    <div className="flex w-full items-end justify-center gap-2 sm:w-auto sm:justify-start sm:gap-3 animate-fade-up">
      <h1 className="font-display font-bold leading-none tracking-tight text-white text-[13vw] sm:text-[9vw] md:text-[7vw] lg:text-[6.5rem] tabular-nums">
        {hours12}:{minutes}
        {showSeconds && (
          <span className="text-white/50 text-[0.5em] ml-1 animate-pulse-soft">{seconds}</span>
        )}
      </h1>
      <span className="font-display font-semibold text-white/70 text-[4vw] sm:text-[2.5vw] md:text-2xl mb-1 sm:mb-2">
        {period}
      </span>
    </div>
  );
}
