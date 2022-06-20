import { useEffect, useState } from "react";

import Api from "../../../api/instances/core";

const ListBounties = () => {
  const [bounties, setBounties] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await Api.get("/bounty");
      setBounties(list);
    })();
  }, []);

  return (
    <div>
      <p>List Bounties</p>
      <ol>
        {bounties.map(({ id, title }) => (
          <li key={id}>
            <p>{title}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ListBounties;
