import type { User } from "@/types/user";
import { supabase } from "@/lib/supabase";

export interface SignUpInput {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  captchaToken?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

interface UserRow {
  id: string;
  user_id: string;
  email: string;
  mobile?: string | null;
  full_name: string;
  created_at: string;
}

function mapUser(row: UserRow): User {
  return {
    id: row.id,
    userId: row.user_id,
    email: row.email,
    mobile: row.mobile ?? undefined,
    fullName: row.full_name,
    createdAt: row.created_at,
  };
}

function validateEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }
}

function validatePassword(password: string) {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }
}

function generateCivicUserId() {
  const number = Math.floor(10000 + Math.random() * 90000);
  return `CC-${number}`;
}

async function createUniqueCivicUserId() {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const userId = generateCivicUserId();
    const { data, error } = await supabase
      .from("users")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      throw new Error("Unable to verify Civic Connect user ID.");
    }

    if (!data) {
      return userId;
    }
  }

  throw new Error("Unable to generate a unique Civic Connect user ID.");
}

export async function signUp(input: SignUpInput): Promise<User> {
  const email = input.email.trim().toLowerCase();
  const fullName = input.fullName.trim();

  validateEmail(email);
  validatePassword(input.password);

  if (input.password !== input.confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  if (fullName.length < 2) {
    throw new Error("Please enter your full name.");
  }

  // TODO: captcha
  // TODO: prepare 15-day session persistence after email verification.
  const { data: existingProfile, error: existingProfileError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingProfileError) {
  console.error(
    "Existing profile check error:",
    existingProfileError
  );

  throw existingProfileError;
}

  if (existingProfile) {
    throw new Error("An account with this email already exists.");
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (authError) {

    console.error(
  "Supabase auth signup error:",
  authError
);
    const message = authError.message.toLowerCase();

    if (message.includes("already") || message.includes("registered")) {
      throw new Error("An account with this email already exists.");
    }

    if (message.includes("password")) {
      throw new Error("Please use a stronger password.");
    }

    throw new Error(authError.message || "Unable to create account.");
  }

  if (!authData.user) {
    throw new Error("Unable to create account. Please try again.");
  }

  const userId = await createUniqueCivicUserId();
  const createdAt = new Date().toISOString();

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .insert({
      id: authData.user.id,
      user_id: userId,
      full_name: fullName,
      email,
      created_at: createdAt,
    })
    .select("id, user_id, email, mobile, full_name, created_at")
    .single<UserRow>();

  if (profileError) {

  console.error(
    "Profile insert error:",
    profileError
  );

  throw profileError;
}

  return mapUser(profile);
}

export async function login(input: LoginInput): Promise<User> {
  const email = input.email.trim().toLowerCase();

  validateEmail(email);

  if (!input.password) {
    throw new Error("Please enter your password.");
  }

  // TODO: prepare 15-day session persistence.
  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: input.password,
  });

  if (authError) {
  console.error(
    "Supabase auth signup error:",
    authError
  );

  const message =
    authError.message.toLowerCase();

  if (message.includes("rate limit")) {
    throw new Error(
      "Too many signup attempts. Please wait a few minutes."
    );
  }

  if (
    message.includes("already") ||
    message.includes("registered")
  ) {
    throw new Error(
      "An account with this email already exists."
    );
  }

  if (message.includes("password")) {
    throw new Error(
      "Please use a stronger password."
    );
  }

  throw new Error(
    authError.message || "Unable to create account."
  );
}

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("id, user_id, email, mobile, full_name, created_at")
    .eq("email", email)
    .maybeSingle<UserRow>();

  if (profileError || !profile) {
    throw new Error("Login succeeded, but user profile could not be loaded.");
  }

  return mapUser(profile);
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Unable to log out. Please try again.");
  }
}
