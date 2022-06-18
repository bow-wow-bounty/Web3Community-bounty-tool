/* eslint-disable no-param-reassign */

import Cookies from "cookies";
import { verify } from "jsonwebtoken";

import { AUTH_COOKIES_KEYS, AUTH_SECRET } from "../../config/auth";

const handler =
  (main, { isProtected = false } = {}) =>
  (req, res) => {
    const cookies = new Cookies(req, res, { keys: AUTH_COOKIES_KEYS });

    req.cookies = cookies;
    res.cookies = cookies;

    if (isProtected) {
      try {
        const token = cookies.get("access_token", {
          signed: true,
        });

        const decoded = verify(token, AUTH_SECRET);

        if (!decoded.address) {
          throw new Error("Unauthorized");
        }

        res.user = { address: decoded.address };
      } catch (e) {
        return res.status(401).json();
      }
    }

    return main(req, res);
  };

export default handler;
