import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyList = handler(async (req, res) => {
  const bounties = await prisma.bounty.findMany();
  res.status(200).json(bounties);
});

export default bountyList;
