import { PrismaClient } from "@prisma/client";

import handler from "../../../utils/handler";

const prisma = new PrismaClient();

const roleDelete = handler(
  async ({ query: { wallet } }, res) => {
    const role = await prisma.roles.delete({
      where: { wallet },
    });

    res.status(200).json(role);
  },
  { isProtected: true, roles: ["SUPER_ADMIN"] }
);

export default roleDelete;
