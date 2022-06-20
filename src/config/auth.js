import ms from "ms";

export const AUTH_EXPIRY_DURATION = ms("6h");
export const AUTH_AUDIENCE =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
export const AUTH_SECRET = process.env.AUTH_JWT_SECRET;
export const AUTH_REQUEST_TOKEN_SECRET = process.env.AUTH_REQUEST_SECRET;
export const AUTH_COOKIES_KEYS = JSON.parse(process.env.AUTH_COOKIES_KEYS);
