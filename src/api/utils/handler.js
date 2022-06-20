/* eslint-disable no-param-reassign */

import Cookies from "cookies";
import { verify } from "jsonwebtoken";

import { AUTH_COOKIES_KEYS, AUTH_SECRET } from "../../config/auth";

const handler =
  (main, { isProtected = false, roles = [] } = {}) =>
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

        if (!decoded.wallet) {
          throw new Error("Unauthorized");
        }

        req.user = { wallet: decoded.wallet };

        if (roles.length) {
          if (!roles.some((role) => decoded.roles.includes(role))) {
            return res.status(403).json();
          }
        }
      } catch (e) {
        res.status(401).json();
        throw e;
      }
    }

    return main(req, res);
  };

export default handler;
