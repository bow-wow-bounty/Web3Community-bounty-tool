-- CreateTable
CREATE TABLE "Roles" (
    "wallet" TEXT NOT NULL,
    "roles" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("wallet")
);

-- CreateTable
CREATE TABLE "Bounty" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "wallets" TEXT[],
    "deadline" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "todo" TEXT NOT NULL,
    "evaluation" TEXT NOT NULL,
    "resources" TEXT NOT NULL,
    "distribution" TEXT NOT NULL,
    "winnerCount" INTEGER NOT NULL,
    "totalReward" INTEGER NOT NULL,
    "pocName" TEXT NOT NULL,
    "pocTwitter" TEXT NOT NULL,
    "pocDiscord" TEXT NOT NULL,

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);
