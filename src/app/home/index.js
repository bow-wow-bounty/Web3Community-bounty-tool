import { useEffect, useState } from "react";

import Api from "../../api/instances/core";
import Header from "./components/header";
import List from "./components/list";

const Home = () => {
  const [bounties, setBounties] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setBounties([]);
    Api.get(`/bounty?${query}`).then(setBounties);
  }, [query]);

  return (
    <div className="min-h-full-page container mx-auto space-y-8 py-8">
      <Header setQuery={setQuery} />
      <List bounties={bounties} />
    </div>
  );
};

export default Home;
