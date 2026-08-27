import { useClock } from "./hooks/useClock";
import { useLocation } from "./hooks/useLocation";
import { useSettings } from "./hooks/useSettings";
import AnalogClock from "./components/AnalogClock";
import DigitalClock from "./components/DigitalClock";
import LocationBadge from "./components/LocationBadge";
import UTCClock from "./components/UTCClock";
import BackgroundOrbs from "./components/BackgroundOrbs";
import SettingsPanel from "./components/SettingsPanel";

export default function App() {
  const now = useClock();
  const location = useLocation();
  const { settings, update, reset, ready } = useSettings();

  if (!ready) return null;

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden transition-colors duration-500"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, var(--color-primary-light) 0%, var(--color-primary) 45%, var(--color-primary-dark) 100%)",
      }}
    >
      <BackgroundOrbs />
      <SettingsPanel settings={settings} onChange={update} onReset={reset} />

      <main className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center gap-8 px-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex w-full flex-col items-center justify-center gap-4 text-center sm:w-auto sm:items-start sm:text-left">
          {(settings.clockStyle === "digital" || settings.clockStyle === "both") && (
            <DigitalClock date={now} showSeconds={settings.showSeconds} />
          )}
          <LocationBadge location={location} date={now} />
          <UTCClock date={now} />
        </div>

        {(settings.clockStyle === "analog" || settings.clockStyle === "both") && (
          <AnalogClock date={now} size={168} />
        )}
      </main>
    </div>
  );
}
