import { PrismaClient } from "@prisma/client";
// import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import { applySpec, pathOr, propOr } from "ramda";

import { AUTH_EXPIRY_DURATION, AUTH_SECRET } from "../../../config/auth";
// import mintList from "../../../config/mint-list";
import { verifyAuthResponse } from "../../utils/auth";
import handler from "../../utils/handler";

const prisma = new PrismaClient();

const createToken = applySpec({
  wallet: propOr("", "publicKey"),
  roles: pathOr([], ["rolesEntry", "roles"]),
});

const authVerify = handler(
  async ({ body: { message, signature, publicKey } }, res) => {
    const verified = verifyAuthResponse(message, signature, publicKey);

    if (verified) {
      const rolesEntry = await prisma.roles.findUnique({
        where: {
          wallet: publicKey,
        },
      });

      // const nfts = await axios
      //   .get(
      //     `https://solana-gateway.moralis.io/account/mainnet/${publicKey}/nft`,
      //     {
      //       headers: {
      //         "X-API-Key": process.env.SOLANA_GATEWAY_MORALIS_KEY,
      //       },
      //     }
      //   )
      //   .then(propOr([], "data"));

      // const containsNft = Boolean(
      //   nfts.find((nft) => mintList.includes(nft.mint))
      // );

      const containsNft = true;

      if (
        !containsNft &&
        !["ADMIN", "SUPER_ADMIN"].find((role) =>
          rolesEntry.roles.includes(role)
        )
      ) {
        return res
          .status(403)
          .json({ message: "This wallet does not own NFT" });
      }

      const token = jsonwebtoken.sign(
        createToken({
          publicKey,
          rolesEntry,
        }),
        AUTH_SECRET,
        { expiresIn: AUTH_EXPIRY_DURATION },
        undefined
      );

      res.cookies.set("access_token", token, {
        signed: false,
        httpOnly: true,
        expiresIn: AUTH_EXPIRY_DURATION,
      });
    }

    return res.status(200).json({ verified });
  }
);

export default authVerify;
