import PropTypes from "prop-types";

import Loading from "../../../../components/loading";
import BountyCard from "./components/bounty-card";

const List = ({ bounties }) => {
  return (
    <div className="w-full">
      <p className="font-display text-3xl">Recent Bounties</p>
      {!bounties.length ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
};

export default List;

List.propTypes = {
  bounties: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired })
  ).isRequired,
};
