import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyGetWinners = handler(async ({ query: { id } }, res) => {
  const bounty = await prisma.winner.findMany({
    where: { bountyId: id },
    include: {
      submission: true,
    },
  });

  // if (!bounty) {
  //   return res.status(404).json();
  // }

  return res.status(200).json(bounty);
});

export default bountyGetWinners;
