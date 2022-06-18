const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const SuperAdminWallets = JSON.parse(process.env.SUPER_ADMIN_WALLETS);

async function main() {
  const SuperAdmins = await Promise.all(
    SuperAdminWallets.map((wallet) =>
      prisma.roles.upsert({
        where: { wallet },
        update: {},
        create: {
          wallet,
          roles: ["SUPER_ADMIN"],
        },
      })
    )
  );

  // eslint-disable-next-line no-console
  console.log({ SuperAdmins });
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
