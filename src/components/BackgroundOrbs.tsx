export default function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-1/4 -left-1/4 h-[60vmax] w-[60vmax] rounded-full opacity-40 blur-3xl animate-drift-slow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[55vmax] w-[55vmax] rounded-full opacity-30 blur-3xl animate-drift-slow-rev"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-primary-light) 0%, transparent 70%)",
        }}
      />
      {/* Subtle vignette so text always stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
    </div>
  );
}
