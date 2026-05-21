"use client";

import { FormEvent, useEffect, useState } from "react";
import { ImagePlus, LocateFixed, Loader2, Send, X } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Potholes",
  "Garbage",
  "Water Leakage",
  "Streetlights",
  "Drainage",
  "Roads",
];

// TODO: extract image EXIF metadata
// TODO: compare image GPS with device GPS
// TODO: calculate distance threshold
// TODO: mark report verified/suspicious

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [location, setLocation] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [roadName, setRoadName] = useState("");
  const [nearbyLandmark, setNearbyLandmark] = useState("");
  const [extraDirections, setExtraDirections] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported on this device");
    return;
  }

  setLocation("Fetching current location...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("GPS:", lat, lon);
        console.log("Address:", data);

        const a = data.address || {};

        const locationText = [
          a.road,
          a.suburb || a.neighbourhood,
          a.city || a.town || a.village,
          a.state,
        ]
          .filter(Boolean)
          .join(", ");

        setLocation(
          locationText || data.display_name || "Location unavailable"
        );
      } catch (err) {
        console.error("Location fetch failed:", err);
        setLocation("Could not fetch address");
      }
    },
    (error) => {
      console.error("GPS error:", error);

      switch (error.code) {
        case error.PERMISSION_DENIED:
          setLocation("Location permission denied");
          break;

        case error.TIMEOUT:
          setLocation("Location request timed out");
          break;

        default:
          setLocation("Unable to determine location");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    }
  );
};

  const handleUseCurrentGPS = () => {
  if (!navigator.geolocation) {
    setCurrentLocation("GPS location is not supported on this device.");
    return;
  }

  setIsFetchingLocation(true);
  setCurrentLocation("Fetching current location...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log("Lat:", lat);
        console.log("Lon:", lon);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );

        const data = await response.json();

        console.log(data);

        const a = data.address || {};

        const locationText = [
          a.road,
          a.suburb || a.neighbourhood,
          a.city || a.town || a.village,
          a.state,
        ]
          .filter(Boolean)
          .join(", ");

        setCurrentLocation(
          locationText ||
          data.display_name ||
          "Location unavailable"
        );

      } catch (error) {
        console.error(error);
        setCurrentLocation("Could not fetch address.");
      }

      setIsFetchingLocation(false);
    },

    (error) => {
      console.error(error);

      switch (error.code) {
        case error.PERMISSION_DENIED:
          setCurrentLocation("Location permission denied.");
          break;

        case error.TIMEOUT:
          setCurrentLocation("Location request timed out.");
          break;

        default:
          setCurrentLocation("Unable to fetch location.");
      }

      setIsFetchingLocation(false);
    },

    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      issueTitle,
      category,
      description,
      currentLocation,
      roadName,
      nearbyLandmark,
      extraDirections,
    });

    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-10000 flex items-center justify-center overflow-hidden bg-black/50 p-3 backdrop-blur-sm transition-opacity duration-300 sm:p-4 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 sm:max-h-[calc(100dvh-2rem)] ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"
        }`}
      >
        <div className="sticky top-0 z-20 flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:px-8 sm:py-6">
          <div>
            <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
              Report New Issue
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
              Share clear details so the right department can review and respond.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
            aria-label="Close report modal"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <div>
            <label
              htmlFor="issue-title"
              className="mb-3 block text-base font-semibold text-slate-950 sm:text-lg"
            >
              Issue title
            </label>

            <input
              id="issue-title"
              type="text"
              value={issueTitle}
              onChange={(event) => setIssueTitle(event.target.value)}
              placeholder="Example: Broken streetlight near community park"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-slate-950 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="issue-category"
                className="mb-3 block text-base font-semibold text-slate-950 sm:text-lg"
              >
                Category
              </label>

              <select
                id="issue-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-slate-950 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                required
              >
                <option value="">Select category</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-base font-semibold text-slate-950 sm:text-lg">
                Image upload
              </label>

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-2xl border border-dashed border-slate-300 px-5 py-4 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#2563EB]"
              >
                Add photo evidence
                <ImagePlus />
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="issue-description"
              className="mb-3 block text-base font-semibold text-slate-950 sm:text-lg"
            >
              Description
            </label>

            <textarea
              id="issue-description"
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe issue, severity, nearby details..."
              className="w-full resize-none rounded-2xl border border-slate-200 p-5 text-slate-950 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-950">
                  Location Details
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
                  Current GPS location is required. Add extra details to help
                  authorities locate the issue precisely.
                </p>
              </div>

              <button
                type="button"
                onClick={handleUseCurrentGPS}
                disabled={isFetchingLocation}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-[#2563EB] shadow-sm transition hover:bg-blue-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isFetchingLocation ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <LocateFixed className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                Use Current GPS
              </button>
            </div>

            <div>
              <label
                htmlFor="current-location"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Current Location
              </label>

              <input
                id="current-location"
                type="text"
                value={currentLocation}
                onChange={(event) => setCurrentLocation(event.target.value)}
                placeholder={
                  isFetchingLocation
                    ? "Fetching current location..."
                    : "Use Current GPS to auto-fill location"
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="road-name"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Road / Street Name
                </label>

                <input
                  id="road-name"
                  type="text"
                  value={roadName}
                  onChange={(event) => setRoadName(event.target.value)}
                  placeholder="Kalewadi Main Road"
                  className="w-full rounded-xl border border-slate-200 bg-white p-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="nearby-landmark"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Nearby Landmark
                </label>

                <input
                  id="nearby-landmark"
                  type="text"
                  value={nearbyLandmark}
                  onChange={(event) => setNearbyLandmark(event.target.value)}
                  placeholder="Opposite D-Mart"
                  className="w-full rounded-xl border border-slate-200 bg-white p-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="extra-directions"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Extra Directions
              </label>

              <textarea
                id="extra-directions"
                rows={3}
                value={extraDirections}
                onChange={(event) => setExtraDirections(event.target.value)}
                placeholder="Near signal beside bus stop"
                className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-20 flex shrink-0 flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-5 sm:flex-row sm:justify-end sm:px-8 sm:py-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-8 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-2xl bg-[#2563EB] px-8 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
          >
            <Send className="mr-2 inline h-4 w-4" aria-hidden="true" />
            Submit report
          </button>
        </div>
      </form>
    </div>
  );
}
