import { connection } from "next/server";
import { envConfig } from "./configs/env.config";

export async function register() {
  envConfig.recaptchaSiteKey = String(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  );
}
