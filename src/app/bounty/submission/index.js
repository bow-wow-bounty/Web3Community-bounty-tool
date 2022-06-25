import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Api from "../../../api/instances/core";
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

  return !bounty ? null : (
    <div className="min-h-full-page w-full overflow-auto bg-theme-light-gray py-12">
      <div className="container mx-auto">
        <Header bounty={bounty} />
        <Form bounty={bounty} />
      </div>
    </div>
  );
};

export default Submission;
