"use client";

import Turnstile from "react-turnstile";

interface CaptchaProps {
  onVerify: (token: string) => void;
}

export default function Captcha({
  onVerify,
}: CaptchaProps) {
  return (
    <Turnstile
  sitekey={
    process.env
      .NEXT_PUBLIC_TURNSTILE_SITE_KEY!
  }

  onVerify={(token)=>{
    console.log(
      "Turnstile token:",
      token
    );

    onVerify(token);
  }}

  onExpire={() => {

    console.log(
      "Turnstile expired"
    );

    onVerify("");
  }}

  onError={() => {

    console.log(
      "Turnstile error"
    );

    onVerify("");
  }}
/>
  );
}