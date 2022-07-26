import { CheckCircleIcon, CogIcon, XCircleIcon } from "@heroicons/react/solid";

const fields = [
  {
    name: "#",
    key: "index",
  },
  {
    name: "Title",
    key: "title",
  },
  {
    name: "Status",
    key: "status",
    value: ({ deadline }) =>
      new Date(deadline).getTime() > Date.now() ? (
        <p className="inline-flex items-center rounded bg-theme-green/10 px-2 py-1 text-xs font-medium text-theme-dark-green">
          <CheckCircleIcon className="mr-1 h-2 w-2" />
          Active
        </p>
      ) : (
        <p className="inline-flex items-center rounded bg-theme-red/10 px-2 py-1 text-xs font-medium text-theme-red">
          <XCircleIcon className="mr-1 h-2 w-2" />
          Ended
        </p>
      ),
  },
  {
    name: "Deadline",
    key: "deadline",
    value: ({ deadline }) =>
      new Date(deadline).toDateString().split(" ").slice(1).join(" "),
  },
  {
    name: "Category",
    key: "category",
    value: ({ category }) => (
      <p className="inline-flex items-center rounded bg-theme-dark-orange/10 px-2 py-1 text-xs font-medium text-theme-dark-orange">
        <CogIcon className="mr-1 h-2 w-2" />
        {category}
      </p>
    ),
  },
  {
    name: "Type",
    key: "type",
    value: ({ type }) => <p>{type}</p>,
  },
  {
    name: "Point of Contact",
    key: "pocName",
    value: ({ pocName }) => (
      <p className="max-w-[15em] overflow-hidden text-ellipsis">{pocName}</p>
    ),
  },
  {
    name: "Creator",
    key: "creator",
    value: ({ creator }) => (
      <p className="max-w-[10em] overflow-hidden text-ellipsis">{creator}</p>
    ),
  },
  {
    name: "Total Reward",
    key: "totalReward",
    value: ({ totalReward, rewardCurrency }) =>
      `${totalReward} ${rewardCurrency}`,
  },
  {
    name: "Submissions",
    key: "submissions",
    value: ({ _count: { submissions } }) => {
      return String(submissions);
    },
  },
  {
    name: "Reward Status",
    key: "rewardStatus",
    value: ({ winners }) => (winners?.length ? "Txn Initiated" : "Pending"),
  },
];

export default fields;
