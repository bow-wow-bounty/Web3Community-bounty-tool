import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyUpdate = handler(async ({ body: { id, status } }, res) => {
  const data = await prisma.bounty.update({
    data: { status },
    where: { id },
  });

  res.status(200).json(data);
});

export default bountyUpdate;
