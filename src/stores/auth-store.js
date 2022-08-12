import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import bs58 from "bs58";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createContainer } from "unstated-next";

import Api from "../api/instances/core";

const AuthStore = createContainer(() => {
  const { signMessage, publicKey, wallet, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const [initialized, toggleInitialized] = useState(false);

  const [verified, setVerified] = useState(false);

  const [user, updateUser] = useState({
    wallet: "",
    roles: [],
  });

  const isProcessing = useMemo(
    () => Boolean(wallet && publicKey && !user?.wallet),
    [publicKey, user?.wallet, wallet]
  );

  const isLoggedIn = useMemo(() => Boolean(user?.wallet), [user?.wallet]);

  useEffect(() => {
    if (!initialized) {
      Api.get("/auth/user")
        .then((data) => {
          updateUser(data);
          toggleInitialized(true);
        })
        .catch(() => toggleInitialized(true));
    }
  }, [initialized]);

  useEffect(() => {
    if (verified) {
      Api.get("/auth/user").then(updateUser);
    }
  }, [verified]);

  useEffect(() => {
    (async () => {
      if (initialized && connected && !isLoggedIn) {
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

          await Api.put("/admin/roles", {
            roles: [{ wallet: publicKey, roles: ["ADMIN", "CREATOR"] }],
          });

          setVerified(verified);
        } catch (e) {
          setVerified(false);
          await disconnect();
        }
      }
    })();
  }, [connected, disconnect, initialized, isLoggedIn, publicKey, signMessage]);

  const logout = useCallback(async () => {
    await disconnect();
    await Api.delete("/auth/logout");
    window.location.reload();
  }, [disconnect]);

  const login = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  return { login, logout, isLoggedIn, isProcessing, user };
});

export default AuthStore;
