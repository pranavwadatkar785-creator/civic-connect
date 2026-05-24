export interface VerificationResult {
  status:
    | "verified"
    | "suspicious"
    | "unverified";

  score: number;
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos(
      (lat1 * Math.PI) / 180
    ) *
      Math.cos(
        (lat2 * Math.PI) / 180
      ) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

export function verifyImageLocation(
  currentLat: number,
  currentLng: number,
  imageLat?: number,
  imageLng?: number
): VerificationResult {
  if (
    imageLat == null ||
    imageLng == null
  ) {
    return {
      status: "unverified",
      score: 40,
    };
  }

  const distance =
    calculateDistance(
      currentLat,
      currentLng,
      imageLat,
      imageLng
    );

  if (distance <= 0.1) {
    return {
      status: "verified",
      score: 95,
    };
  }

  if (distance <= 1) {
    return {
      status: "verified",
      score: 75,
    };
  }

  return {
    status: "suspicious",
    score: 20,
  };
}