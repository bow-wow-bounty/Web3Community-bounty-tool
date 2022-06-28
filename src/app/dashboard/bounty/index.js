import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import Api from "../../../api/instances/core";
import Header from "./components/header";
import Submissions from "./components/submissions";
import Winners from "./components/winners";

const BountyDashboard = () => {
  const {
    query: { id },
  } = useRouter();
  const [bounty, setBounty] = useState(null);

  const loadData = useCallback(() => {
    if (id) {
      Api.get(`/bounty/${id}`).then((data) => {
        setBounty(data);
      });
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const reviewSubmissions = useCallback(
    async (wallet, reviewed) => {
      await Api.put(`/bounty/submission-review`, {
        bountyId: id,
        wallet,
        reviewed,
      });
      await loadData();
    },
    [id, loadData]
  );

  return !bounty ? null : (
    <div className="min-h-full-page w-full overflow-auto bg-theme-light-gray py-12">
      <div className="container mx-auto">
        <Header bounty={bounty} />
        <div className="relative mt-12 flex w-full space-x-8 overflow-hidden">
          <Submissions
            submissions={bounty?.submissions}
            reviewSubmissions={reviewSubmissions}
          />
          <Winners
            winners={bounty?.winners}
            rewardCurrency={bounty?.rewardCurrency}
            refresh={loadData}
          />
        </div>
      </div>
    </div>
  );
};

export default BountyDashboard;
