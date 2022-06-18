import Cookies from "cookies";

import { AUTH_COOKIES_KEYS, AUTH_EXPIRY_DURATION } from "../../config/auth";
import handler from "../utils/handler";

const hello = handler(
  (req, res) => {
    const cookies = new Cookies(req, res, { keys: AUTH_COOKIES_KEYS });

    const token = cookies.get("access_token", {
      signed: true,
      httpOnly: true,
      expiresIn: AUTH_EXPIRY_DURATION,
    });

    return res.status(200).json({ name: "John Doe", token });
  },
  { isProtected: true }
);

export default hello;
