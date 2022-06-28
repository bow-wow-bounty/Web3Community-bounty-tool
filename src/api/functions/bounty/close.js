import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyClose = handler(
  async ({ body: { winners } }, res) => {
    const data = await prisma.winner.createMany({
      data: winners,
    });

    res.status(200).json(data);
  },
  { isProtected: true, roles: ["CREATOR"] }
);

export default bountyClose;
