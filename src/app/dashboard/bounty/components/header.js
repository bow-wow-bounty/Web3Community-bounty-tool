import { LockClosedIcon } from "@heroicons/react/outline";
import {
  CheckCircleIcon,
  DesktopComputerIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { stripHtml } from "string-strip-html";

const Header = ({
  bounty: {
    image,
    title,
    deadline,
    totalReward,
    rewardCurrency,
    description,
    category,
    type,
  },
}) => {
  const ended = useMemo(() => new Date() >= new Date(deadline), [deadline]);

  return (
    <div className="relative flex flex-col items-center rounded-lg bg-theme-orange p-8 shadow lg:flex-row">
      <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-md lg:mr-4 lg:mb-0 lg:w-1/4">
        <Image layout="fill" src={image} alt={title} objectFit="cover" />
      </div>
      <div className="flex-1">
        <div className="py-4">
          <p className="text-xs">
            Deadline:
            {dayjs(new Date(deadline)).format(`MMM DD YYYY hh:mm A`)}
          </p>
          <p className="font-display text-2xl">{title}</p>
          <p className="text-sm line-clamp-2">
            {stripHtml(description).result}
          </p>
        </div>
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center justify-start space-x-2 lg:flex-nowrap">
            <p className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium">
              <DesktopComputerIcon className="mr-1 h-4 w-4" />
              {category}
            </p>
            <p
              className={classNames(
                "inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-medium",
                {
                  "text-theme-dark-green": !ended,
                  "text-theme-red": ended,
                }
              )}
            >
              {!ended ? (
                <CheckCircleIcon className="mr-1 h-4 w-4" />
              ) : (
                <XCircleIcon className="mr-1 h-4 w-4" />
              )}
              {!ended ? "Active" : "Ended"}
            </p>
            <p className="rounded-full border border-black bg-black py-1.5 px-4 text-xs font-bold text-white">
              <span className="block translate-y-[1px]">
                {rewardCurrency} {totalReward}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="pr-8">
        <div className="absolute bottom-0 right-0 m-6">
          {type === "Closed" && <LockClosedIcon className="h-6 w-6" />}
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  bounty: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    rewardCurrency: PropTypes.string.isRequired,
    totalReward: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ended: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
