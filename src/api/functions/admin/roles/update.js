import { PrismaClient } from "@prisma/client";

import handler from "../../../utils/handler";

const prisma = new PrismaClient();

const roleUpdate = handler((req, res) => {
  const { wallet, roles } = req.body;

  const role = prisma.roles.upsert({
    where: { wallet },
    update: {
      roles,
    },
    create: {
      wallet,
      roles,
    },
  });

  res.status(200).json(role);
});

export default roleUpdate;
