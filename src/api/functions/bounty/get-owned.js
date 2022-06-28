import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyGetOwned = handler(async ({ query: { id } }, res) => {
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

  return res.status(200).json(bounty);
});

export default bountyGetOwned;
