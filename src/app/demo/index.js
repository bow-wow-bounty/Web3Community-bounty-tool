import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import bs58 from "bs58";
import { useCallback, useEffect } from "react";

import Api from "../../api/instances/core";
import AddWinners from "./components/add-winners";
import CreateBounty from "./components/create-bounty";
import ListBounties from "./components/list-bounties";
import MakeSubmission from "./components/make-submission";

const Demo = () => {
  const { signMessage, publicKey, wallet, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();

  useEffect(() => {
    (async () => {
      await Api.get("/hello");
      await Api.get("/auth/user");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (connected) {
        try {
          const { message } = await Api.post("/auth/request", {
            wallet: bs58.encode(publicKey.toBytes()),
          });

          const encodedMessage = new TextEncoder().encode(message);

          const signature = await signMessage(encodedMessage);

          const serializedSignature = bs58.encode(signature);
          const serializedPublicKey = bs58.encode(publicKey.toBytes());

          const { verified } = await Api.post("/auth/verify", {
            message,
            signature: serializedSignature,
            publicKey: serializedPublicKey,
          });

          if (!verified) {
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

      <button
        type="button"
        onClick={async () => {
          await Api.delete("/auth/logout");
          window.location.reload();
        }}
      >
        log out api
      </button>

      <div>
        <CreateBounty />
        <ListBounties />
        <MakeSubmission />
        <AddWinners />
      </div>
    </div>
  );
};

export default Demo;
