import bs58 from "bs58";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import nacl from "tweetnacl";

import { AUTH_AUDIENCE, AUTH_REQUEST_TOKEN_SECRET } from "../../config/auth";

export const generateAuthRequest = (wallet) =>
  `Login to ${AUTH_AUDIENCE}.
  
  Verification Token: ${AES.encrypt(
    wallet,
    AUTH_REQUEST_TOKEN_SECRET
  ).toString()}`;

export const verifyAuthResponse = (message, signature, publicKey) => {
  const deserializedSignature = bs58.decode(signature);
  const deserializedPublicKey = bs58.decode(publicKey);

  const signatureVerified = nacl.sign.detached.verify(
    new TextEncoder().encode(message),
    deserializedSignature,
    deserializedPublicKey
  );

  if (signatureVerified) {
    const token = message.split("Verification Token: ").slice(-1)[0];

    const decrypted = AES.decrypt(token, AUTH_REQUEST_TOKEN_SECRET).toString(
      Utf8
    );

    if (decrypted === publicKey) {
      return true;
    }
  }

  return false;
};
