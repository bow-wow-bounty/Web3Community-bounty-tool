import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountyList = handler(
  async (
    { query: { category = "All", type = "All", timeline = "All" } },
    res
  ) => {
    const where = {};

    if (category !== "All") {
      where.category = category;
    }

    if (type !== "All") {
      where.type = type;
    }

    if (timeline !== "All") {
      if (timeline === "Active") {
        where.deadline = {
          gte: new Date(),
        };
      } else if (timeline === "Expired") {
        where.deadline = {
          lte: new Date(),
        };
      }
    }

    const bounties = await prisma.bounty.findMany({
      where,
      orderBy: [
        {
          deadline: "desc",
        },
      ],
      select: {
        id: true,
        image: true,
        description: true,
        title: true,
        category: true,
        type: true,
        deadline: true,
        rewardCurrency: true,
        totalReward: true,
      },
    });
    res.status(200).json(bounties);
  }
);

export default bountyList;
