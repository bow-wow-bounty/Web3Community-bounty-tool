import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyGet = handler(async ({ query: { id } }, res) => {
  const bounty = await prisma.bounty.findUnique({
    where: { id },
  });

  if (!bounty) {
    return res.status(404).json();
  }

  return res.status(200).json(bounty);
});

export default bountyGet;
