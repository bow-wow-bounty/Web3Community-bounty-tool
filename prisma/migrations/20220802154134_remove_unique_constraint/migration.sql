-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_wallet_bountyId_fkey" FOREIGN KEY ("wallet", "bountyId") REFERENCES "Submission"("wallet", "bountyId") ON DELETE RESTRICT ON UPDATE CASCADE;
