interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export async function POST(request: Request) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    return Response.json(
      {
        success: false,
        error: "Turnstile secret key is not configured.",
      },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    token?: unknown;
  } | null;

  if (!body || typeof body.token !== "string" || !body.token.trim()) {
    return Response.json(
      {
        success: false,
        error: "CAPTCHA token is required.",
      },
      { status: 400 }
    );
  }

  const formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", body.token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  );

  const result = (await response.json()) as TurnstileVerifyResponse;

  return Response.json(result, {
    status: response.ok ? 200 : 502,
  });
}
