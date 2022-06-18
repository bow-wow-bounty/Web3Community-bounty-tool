import { PrismaClient } from "@prisma/client";
import Cookies from "cookies";
import { sign } from "jsonwebtoken";
import { applySpec, pathOr, propOr } from "ramda";

import {
  AUTH_COOKIES_KEYS,
  AUTH_EXPIRY_DURATION,
  AUTH_SECRET,
} from "../../../config/auth";
import { verifyAuthResponse } from "../../utils/auth";
import handler from "../../utils/handler";

const prisma = new PrismaClient();

const createToken = applySpec({
  wallet: propOr("", "publicKey"),
  roles: pathOr([], ["rolesEntry", "roles"]),
});

const authVerify = handler(async (req, res) => {
  const { message, signature, publicKey } = req.body;

  const verified = verifyAuthResponse(message, signature, publicKey);

  if (verified) {
    const rolesEntry = await prisma.roles.findUnique({
      where: {
        wallet: publicKey,
      },
    });

    const token = sign(
      createToken({
        publicKey,
        rolesEntry,
      }),
      AUTH_SECRET,
      { expiresIn: AUTH_EXPIRY_DURATION },
      undefined
    );

    const cookies = new Cookies(req, res, { keys: AUTH_COOKIES_KEYS });

    cookies.set("access_token", token, {
      signed: true,
      httpOnly: true,
      expiresIn: AUTH_EXPIRY_DURATION,
    });
  }

  return res.status(200).json({ verified });
});

export default authVerify;
