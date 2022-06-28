import { PrismaClient } from "@prisma/client";

import handler from "../../../utils/handler";

const prisma = new PrismaClient();

const roleList = handler(
  async (req, res) => {
    const bounties = await prisma.roles.findMany();
    res.status(200).json(bounties);
  },
  { isProtected: true, roles: ["SUPER_ADMIN"] }
);

export default roleList;
