/* eslint-disable no-param-reassign */
import Cookies from "cookies";
import { verify } from "jsonwebtoken";

import { AUTH_SECRET } from "../../config/auth";

const handler =
  (main, { isProtected = false, roles = [] } = {}) =>
  (req, res) => {
    try {
      const cookies = new Cookies(req, res);

      req.cookies = cookies;
      res.cookies = cookies;

      if (isProtected) {
        try {
          const token = cookies.get("access_token", {
            signed: false,
          });

          const decoded = verify(token, AUTH_SECRET, undefined, undefined);

          if (!decoded.wallet) {
            throw new Error("Unauthorized");
          }

          req.user = { wallet: decoded.wallet, roles: decoded.roles };

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
    } catch (e) {
      return res.status(500).json(e);
    }
  };

export default handler;
