import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyGetOwned = handler(
  async ({ query: { id }, user: { wallet, roles } }, res) => {
    const bounty = await prisma.bounty.findUnique({
      where: { id },
      include: {
        submissions: true,
        winners: true,
      },
    });

    if (!bounty) {
      return res.status(404).json();
    }

    if (bounty && bounty.creator !== wallet && !roles.includes("ADMIN")) {
      return res.status(403).json();
    }

    return res.status(200).json(bounty);
  },
  { isProtected: true, roles: ["CREATOR", "ADMIN"] }
);

export default bountyGetOwned;
