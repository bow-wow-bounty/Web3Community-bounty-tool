import { useEffect, useState } from "react";

import Api from "../../../../api/instances/core";
import BountyCard from "./components/bounty-card";

const List = () => {
  const [bounties, setBounties] = useState([]);

  useEffect(() => {
    Api.get("/bounty").then((list) => {
      setBounties(list);
    });
  }, []);

  return (
    <div className="w-full">
      <p className="font-display text-3xl">Recent Bounties</p>
      <ul className="my-8 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {bounties.map((bounty) => (
          <li
            key={bounty.id}
            className="col-span-1 overflow-hidden rounded-xl shadow-lg"
          >
            <BountyCard {...bounty} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
