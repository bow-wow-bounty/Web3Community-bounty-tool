import { verify } from "jsonwebtoken";

import { AUTH_SECRET } from "../../../config/auth";
import handler from "../../utils/handler";

const authUser = handler(({ cookies }, res) => {
  try {
    const token = cookies.get("access_token", {
      signed: true,
    });

    const decoded = verify(token, AUTH_SECRET);

    if (!decoded.wallet) {
      throw new Error("Unauthorized");
    }

    res.status(200).json({ wallet: decoded.wallet, roles: decoded.roles });
  } catch (e) {
    res.status(200).json({ wallet: "", roles: [] });
    throw e;
  }
});

export default authUser;
