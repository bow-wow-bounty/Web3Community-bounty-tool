import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyOwnedList = handler(async (req, res) => {
  const bounties = await prisma.bounty.findMany({
    include: { _count: { select: { submissions: true } } },
  });

  res.status(200).json(bounties);
});

export default bountyOwnedList;
