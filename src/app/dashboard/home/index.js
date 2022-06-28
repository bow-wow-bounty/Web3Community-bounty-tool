import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, CogIcon, XCircleIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Api from "../../../api/instances/core";
import logo from "../../../assets/logo-small.svg";

const fields = [
  {
    name: "#",
    key: "id",
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
          Expired
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
    value: ({ type }) =>
      type === "Closed" ? (
        <LockClosedIcon className="mx-auto h-4 w-4" />
      ) : (
        <LockOpenIcon className="mx-auto h-4 w-4" />
      ),
  },
  {
    name: "Point of Contact",
    key: "pocName",
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
    name: "Reward Status",
    key: "rewardStatus",
    value: ({ winners }) => (winners?.length ? "Txn Initiated" : "Pending"),
  },
];

const Dashboard = () => {
  const router = useRouter();
  const [bounties, setBounties] = useState([]);

  useEffect(() => {
    Api.get("/bounty/owned").then((list) => {
      setBounties(list);
    });
  }, []);

  return (
    <div className="min-h-full-page w-full overflow-auto bg-theme-light-gray py-12">
      <div className="container relative mx-auto">
        <div className="relative flex w-full items-center justify-between rounded-t-md bg-theme-orange py-3 px-4">
          <p className="font-display text-2xl">Dashboard</p>
          <div className="h-full">
            <div className="relative aspect-[5/3] w-12">
              <Image src={logo} layout="fill" alt="Logo" objectFit="contain" />
            </div>
          </div>
        </div>
        <table className="w-full border-hidden text-xs">
          <thead className="">
            <tr>
              {fields.map((field, index) => (
                <th
                  key={field.key}
                  className={classNames(
                    "whitespace-nowrap  bg-black py-3.5 px-3 text-center font-normal text-white",
                    {
                      "rounded-bl-md": !index,
                      "rounded-br-md": fields.length - 1 === index,
                    }
                  )}
                >
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bounties.map((bounty, index) => (
              <tr
                key={bounty.id}
                style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.15))" }}
                onClick={() => router.push(`/dashboard/bounty/${bounty.id}`)}
                className="cursor-pointer"
              >
                <td className={classNames("py-1 px-0", { "pt-4": !index })}>
                  <div className="flex h-full min-h-[40px] w-full items-center justify-center whitespace-nowrap rounded-tl rounded-bl bg-white px-3 text-center">
                    {index + 1}
                  </div>
                </td>
                {fields.slice(1).map((field, fieldIndex) => (
                  <td
                    key={field.key}
                    className={classNames("py-1 px-0", { "pt-4": !index })}
                  >
                    <div
                      className={classNames(
                        "flex h-full min-h-[40px] w-full items-center justify-center whitespace-nowrap bg-white px-3 text-center",
                        {
                          "rounded-tr rounded-br":
                            fieldIndex === fields.length - 2,
                        }
                      )}
                    >
                      {field.value ? field.value(bounty) : bounty[field.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
