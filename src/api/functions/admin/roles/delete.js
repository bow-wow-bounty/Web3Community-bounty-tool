import { PrismaClient } from "@prisma/client";

import handler from "../../../utils/handler";

const prisma = new PrismaClient();

const roleDelete = handler(({ query: { wallet } }, res) => {
  const role = prisma.roles.delete({
    where: { wallet },
  });

  res.status(200).json(role);
});

export default roleDelete;
