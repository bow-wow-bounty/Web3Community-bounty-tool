import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyOwnedList = handler(
  async (req, res) => {
    const bounties = await prisma.bounty.findMany(
      req.user.roles.includes("ADMIN")
        ? {}
        : {
            where: {
              creator: req.user.wallet,
            },
          }
    );

    res.status(200).json(bounties);
  },
  { isProtected: true, roles: ["CREATOR", "ADMIN"] }
);

export default bountyOwnedList;
