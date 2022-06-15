import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import bs58 from "bs58";
import { useCallback, useEffect } from "react";
import nacl from "tweetnacl";

import Api from "../../api/core";

const Home = () => {
  const { signMessage, publicKey, wallet, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();

  useEffect(() => {
    (async () => {
      const data = await Api.get("/hello");
      console.log({ data });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (connected) {
        try {
          const message = `Login MF`;
          const messageUint8 = new TextEncoder().encode(message);

          const encodedMessage = new TextEncoder().encode(message);

          const signature = await signMessage(encodedMessage);

          const serializedMessage = bs58.encode(messageUint8);
          const serializedSignature = bs58.encode(signature);
          const serializedPublicKey = bs58.encode(publicKey.toBytes());

          const deserializedMessage = bs58.decode(serializedMessage);
          const deserializedSignature = bs58.decode(serializedSignature);
          const deserializedPublicKey = bs58.decode(serializedPublicKey);

          console.log({
            deserializedMessage,
            serializedMessage,
            deserializedSignature,
            serializedSignature,
            deserializedPublicKey,
            serializedPublicKey,
          });

          const verify = nacl.sign.detached.verify(
            deserializedMessage,
            deserializedSignature,
            deserializedPublicKey
          );

          console.log({ verify });

          if (!verify) {
            await disconnect();
          }
        } catch (e) {
          await disconnect();
        }
      }
    })();
  }, [connected, disconnect, publicKey, signMessage]);

  const handleClick = useCallback(async () => {
    setVisible(true);
  }, [setVisible]);

  return (
    <div>
      {wallet && publicKey ? (
        <button
          type="button"
          onClick={async () => {
            await disconnect();
          }}
        >
          log out
        </button>
      ) : (
        <button type="button" onClick={() => handleClick()}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default Home;
