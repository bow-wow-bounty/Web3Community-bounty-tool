import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import Api from "../../../api/instances/core";
import Button, { ButtonVariant } from "../../../components/button";
import Loading from "../../../components/loading";
import AuthStore from "../../../stores/auth-store";
import Form from "./components/form";
import Header from "./components/header";

const Submission = () => {
  const {
    query: { id },
  } = useRouter();
  const [bounty, setBounty] = useState(null);

  useEffect(() => {
    if (id) {
      Api.get(`/bounty/${id}`).then((data) => {
        setBounty(data);
      });
    }
  }, [id]);

  const { login, logout, isLoggedIn, isProcessing, user } =
    AuthStore.useContainer();

  const ended = useMemo(
    () => new Date() >= new Date(bounty?.deadline),
    [bounty?.deadline]
  );

  const allowSubmission = useMemo(
    () =>
      !ended &&
      (bounty?.type === "Open" ||
        (bounty?.type === "Closed" && bounty?.wallets.includes(user?.wallet))),
    [ended, bounty?.type, user?.wallet, bounty?.wallets]
  );

  return !bounty ? (
    <div className="min-h-full-page w-full overflow-auto bg-theme-light-gray py-12">
      <Loading />
    </div>
  ) : (
    <div className="min-h-full-page w-full overflow-auto bg-theme-light-gray py-12">
      <div className="container mx-auto">
        <Header bounty={bounty} />
        {!user?.wallet ? (
          <div className="flex w-full justify-center">
            <Button
              variant={ButtonVariant.Primary}
              onClick={() => (!isLoggedIn ? login() : logout())}
              disabled={isProcessing}
              className="my-12 mx-auto text-center"
            >
              {isProcessing
                ? "Processing..."
                : !isLoggedIn
                ? "Connect your wallet to make a submissions"
                : "Logout"}
            </Button>
          </div>
        ) : !allowSubmission ? (
          <p className="my-12 w-full text-center">
            Submissions for this bounty are now closed.
          </p>
        ) : (
          <Form bounty={bounty} />
        )}
      </div>
    </div>
  );
};

export default Submission;
