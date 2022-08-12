import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const authUser = handler(
  async ({ user }, res) => {
    const roles = await prisma.roles.findUnique({
      where: { wallet: user.wallet },
    });
    res.status(200).json({ wallet: user.wallet, roles: roles.roles });
  },
  { isProtected: true }
);

export default authUser;
