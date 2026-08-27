import { useEffect, useState } from "react";
import type { LocationInfo } from "../types";

const FALLBACK: LocationInfo = {
  city: "",
  region: "",
  country: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  utcOffsetHours: -new Date().getTimezoneOffset() / 60,
  loading: true,
  error: null,
};

/**
 * Requests the browser's live geolocation, then reverse-geocodes the
 * coordinates into a city/region/country using BigDataCloud's free,
 * key-less reverse geocoding endpoint. Falls back gracefully to the
 * system timezone if permission is denied or the network is unavailable.
 */
export function useLocation(): LocationInfo {
  const [location, setLocation] = useState<LocationInfo>(FALLBACK);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation not supported",
      }));
      return;
    }

    const watcher = navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const utcOffsetHours = -new Date().getTimezoneOffset() / 60;

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (!res.ok) throw new Error("Reverse geocoding failed");
          const data = await res.json();

          setLocation({
            city: data.city || data.locality || data.principalSubdivision || "Unknown",
            region: data.principalSubdivision || "",
            country: data.countryName || "",
            timezone,
            utcOffsetHours,
            loading: false,
            error: null,
          });
        } catch (err) {
          setLocation({
            city: "",
            region: "",
            country: "",
            timezone,
            utcOffsetHours,
            loading: false,
            error: "Couldn't resolve city name",
          });
        }
      },
      (err) => {
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: err.message || "Location permission denied",
        }));
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );

    return () => {
      // getCurrentPosition has no unsubscribe; nothing to clean up.
      void watcher;
    };
  }, []);

  return location;
}
