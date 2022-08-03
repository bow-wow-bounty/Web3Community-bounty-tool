import { PrismaClient } from "@prisma/client";

import handler from "../../../utils/handler";

const prisma = new PrismaClient();

const roleUpdate = handler(
  async (req, res) => {
    const { roles } = req.body;

    const updates = await Promise.all(
      roles.map(({ wallet, roles }) =>
        prisma.roles.upsert({
          where: { wallet },
          update: {
            roles,
          },
          create: {
            wallet,
            roles,
          },
        })
      )
    );

    res.status(200).json(updates);
  },
  { isProtected: true, roles: ["SUPER_ADMIN", "ADMIN"] }
);

export default roleUpdate;
