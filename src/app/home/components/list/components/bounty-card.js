import { LockClosedIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, DesktopComputerIcon } from "@heroicons/react/solid";
import Image from "next/image";
import PropTypes from "prop-types";

import Link from "../../../../../components/link";

const BountyCard = ({
  id,
  image,
  title,
  description,
  category,
  type,
  deadline,
  ended,
  totalReward,
}) => {
  return (
    <Link href={`/bounty/${id}`}>
      <div>
        <div className="relative aspect-[5/3] w-full">
          <Image layout="fill" src={image} alt={title} objectFit="cover" />
        </div>
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <p className="font-display text-2xl">{title}</p>
            <p className="text-xs underline">
              {new Date(deadline).toDateString().split(" ").slice(1).join(" ")}
            </p>
          </div>
          <div>
            <p className="rounded-full border border-black py-1 px-4 text-sm font-bold">
              <span className="block translate-y-[1px]">${totalReward}</span>
            </p>
          </div>
        </div>
        <div className="p-4 pb-2">
          <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
        </div>
        <div className="flex w-full items-center justify-between p-4">
          <div className="flex flex-1 items-center justify-start space-x-2">
            <p className="inline-flex items-center rounded-full bg-theme-blue/10 px-3 py-1 text-sm font-medium text-theme-dark-blue">
              <DesktopComputerIcon className="mr-1 h-4 w-4" />
              {category}
            </p>
            <p className="inline-flex items-center rounded-full bg-theme-green/10 px-3 py-1 text-sm font-medium text-theme-dark-green">
              <CheckCircleIcon className="mr-1 h-4 w-4" />
              {!ended ? "Active" : "Ended"}
            </p>
          </div>
          <div>
            {type === "closed" && <LockClosedIcon className="h-6 w-6" />}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BountyCard;

BountyCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  ended: PropTypes.string.isRequired,
  totalReward: PropTypes.string.isRequired,
};
