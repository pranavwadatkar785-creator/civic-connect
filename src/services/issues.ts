import { supabase } from "@/lib/supabase";

export interface CreateIssueInput {
  title: string;
  description: string;
  category: string;
  anonymous: boolean;
  address: string;
  road: string;
  landmark: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  imageLatitude?: number;
  imageLongitude?: number;
  verificationStatus?: string;
  confidenceScore?: number;
}

export interface Issue {
  id: string;
  tracking_id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  anonymous: boolean;
  address: string;
  road: string;
  landmark: string;
  latitude: number;
  longitude: number;
  status: "reported" | string;
  created_at: string;
}

interface UserProfile {
  id: string;
}

function validateIssueInput(input: CreateIssueInput) {
  if (!input.title.trim()) {
    throw new Error("Issue title is required.");
  }

  if (!input.description.trim()) {
    throw new Error("Issue description is required.");
  }

  if (!input.category.trim()) {
    throw new Error("Issue category is required.");
  }

  if (!input.address.trim()) {
    throw new Error("Issue address is required.");
  }

  if (!Number.isFinite(input.latitude) || !Number.isFinite(input.longitude)) {
    throw new Error("Valid issue coordinates are required.");
  }
}

export function generateTrackingId() {
  const number = Math.floor(10000 + Math.random() * 90000);
  return `CC-ISSUE-${number}`;
}

async function generateUniqueTrackingId() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const trackingId = generateTrackingId();

    const { data, error } = await supabase
      .from("issues")
      .select("tracking_id")
      .eq("tracking_id", trackingId)
      .maybeSingle();

    if (error) {
      throw new Error("Unable to verify issue tracking ID.");
    }

    if (!data) {
      return trackingId;
    }
  }

  throw new Error("Unable to generate a unique issue tracking ID.");
}

async function getAuthenticatedProfile(): Promise<UserProfile> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log("current auth user", user);

  if (authError) {
    throw new Error("Unable to verify current user session.");
  }

  if (!user) {
    throw new Error("You must be logged in to report an issue.");
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle<UserProfile>();

  console.log("profile", profile);

  if (profileError) {
    throw new Error("Unable to load current user profile.");
  }

  if (!profile) {
    throw new Error("Current user profile was not found.");
  }

  return profile;
}

export async function createIssue(input: CreateIssueInput): Promise<Issue> {
  validateIssueInput(input);

  const profile = await getAuthenticatedProfile();
  const trackingId = await generateUniqueTrackingId();
  const payload = {
  tracking_id: trackingId,

  title: input.title.trim(),

  description: input.description.trim(),

  category: input.category.trim(),

  status: "reported",

  user_id: profile.id,

  anonymous: input.anonymous,

  address: input.address.trim(),

  road: input.road.trim(),

  landmark: input.landmark.trim(),

  latitude: input.latitude,

  longitude: input.longitude,

  image_url:
    input.imageUrl ?? null,

  image_latitude:
    input.imageLatitude ?? null,

  image_longitude:
    input.imageLongitude ?? null,

  verification_status:
    input.verificationStatus ??
    "unverified",

  confidence_score:
    input.confidenceScore ?? null,
};

  console.log("payload", payload);

  const { data: issue, error } = await supabase
    .from("issues")
    .insert(payload)
    .select(`id,tracking_id,title,description,category,status,user_id,anonymous,address,road,landmark,latitude,longitude,image_url,image_latitude,image_longitude,verification_status,confidence_score,created_at`)
    .single<Issue>();

  console.log("insert result", issue);
  console.log("insert error", error);

  if (error) {
    throw new Error(error.message || "Unable to create issue report.");
  }

  return issue;
}
