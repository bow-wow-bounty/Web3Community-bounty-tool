import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyCreate = handler(
  async (
    {
      user: { wallet },
      body: {
        title,
        image,
        category,
        type,
        wallets,
        deadline,
        description,
        todo,
        distribution,
        winnerCount,
        evaluation,
        resources,
        rewardCurrency,
        totalReward,
        pocName,
        pocTwitter,
        pocDiscord,
      },
    },
    res
  ) => {
    const bounty = await prisma.bounty.create({
      data: {
        title,
        image,
        category,
        type,
        wallets,
        deadline,
        description,
        todo,
        distribution,
        winnerCount,
        evaluation,
        resources,
        rewardCurrency,
        totalReward,
        pocName,
        pocTwitter,
        pocDiscord,
        creator: wallet,
        ended: false,
        status: "NOT_APPROVED",
      },
    });

    res.status(201).json(bounty);
  },
  { isProtected: true, roles: ["CREATOR"] }
);

export default bountyCreate;
