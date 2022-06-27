import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountySubmission = handler(
  async (
    {
      user: { wallet },
      body: {
        bountyId,
        links,
        files,
        discord,
        twitter,
        telegram,
        email,
        description,
      },
    },
    res
  ) => {
    const submission = await prisma.submission.upsert({
      where: {
        wallet_bountyId: {
          wallet,
          bountyId,
        },
      },
      update: {
        wallet,
        bountyId,
        links,
        files,
        discord,
        twitter,
        telegram,
        email,
        description,
      },
      create: {
        wallet,
        bountyId,
        links,
        files,
        discord,
        twitter,
        telegram,
        email,
        description,
      },
    });

    res.status(200).json(submission);
  },
  { isProtected: true }
);

export default bountySubmission;
