import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Api from "../../../api/instances/core";
import Header from "./components/header";
import Submissions from "./components/submissions";
import Winners from "./components/winners";

const BountyDashboard = () => {
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

  return !bounty ? null : (
    <div className="min-h-full-page w-full overflow-auto bg-theme-light-gray py-12">
      <div className="container mx-auto">
        <Header bounty={bounty} />
        <div className="relative mt-12 flex w-full space-x-8">
          <Submissions />
          <Winners />
        </div>
      </div>
    </div>
  );
};

export default BountyDashboard;
