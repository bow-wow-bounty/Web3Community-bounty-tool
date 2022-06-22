import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyList = handler(async (req, res) => {
  const bounties = await prisma.bounty.findMany({
    select: {
      id: true,
      image: true,
      description: true,
      title: true,
      category: true,
      type: true,
      deadline: true,
      ended: true,
      totalReward: true,
    },
  });
  res.status(200).json(bounties);
});

export default bountyList;
