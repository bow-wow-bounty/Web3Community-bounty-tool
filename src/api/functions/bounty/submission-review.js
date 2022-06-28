import { PrismaClient } from "@prisma/client";

import handler from "../../utils/handler";

const prisma = new PrismaClient();

const bountySubmissionReview = handler(
  async ({ body: { bountyId, wallet, reviewed } }, res) => {
    const submission = await prisma.submission.update({
      where: {
        wallet_bountyId: {
          wallet,
          bountyId,
        },
      },
      data: {
        reviewed,
      },
    });

    res.status(200).json(submission);
  },
  { isProtected: true, roles: ["CREATOR"] }
);

export default bountySubmissionReview;
