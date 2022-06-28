import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Api from "../../../api/instances/core";
import Loading from "../../../components/loading";
import Contents from "./components/contents";
import Header from "./components/header";

const Bounty = () => {
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

  return (
    <div className="min-h-full-page container mx-auto py-12">
      {!bounty ? (
        <Loading />
      ) : (
        <>
          <Header bounty={bounty} />
          <Contents bounty={bounty} />
        </>
      )}
    </div>
  );
};

export default Bounty;
