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
import { useEffect, useMemo, useState } from "react";
import { stripHtml } from "string-strip-html";

import Link from "../../../../../components/link";

const BountyCard = ({
  id,
  image,
  title,
  description,
  category,
  type,
  deadline,
  rewardCurrency,
  totalReward,
}) => {
  const ended = useMemo(() => new Date() >= new Date(deadline), [deadline]);
  const [countdownDeadline, setCountdownDeadline] = useState("calculating");
  // Update the count down every 1 second

  useEffect(() => {
    const x = setInterval(() => {
      // Get today's date and time
      const now = Date.now();
      // Find the distance between now and the count down date
      const d = new Date(deadline);
      const e = d.getTime();
      const distance = e - now;
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdownDeadline(`${days}d ${hours}h ${minutes}m ${seconds}s `);

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        setCountdownDeadline("");
      }
    }, 1000);
  }, [deadline]);
  return (
    <Link href={`/bounty/${id}`}>
      <div>
        <div className="relative aspect-[5/3] w-full">
          <Image layout="fill" src={image} alt={title} objectFit="cover" />
        </div>
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex-1 overflow-hidden">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap font-display text-2xl">
              {title}
            </p>
            <p className="text-xs underline">
              {dayjs(new Date(deadline)).format(`MMM DD YYYY hh:mm A`)}
            </p>
            <div className="text-xs font-bold">{countdownDeadline}</div>
          </div>
          <div>
            <p className="rounded-full border border-black py-1 px-4 text-sm font-bold">
              <span className="block translate-y-[1px]">
                {totalReward} {rewardCurrency}
              </span>
            </p>
          </div>
        </div>
        <div className="p-4 pb-2">
          <p className="text-xs text-gray-500 line-clamp-2">
            {stripHtml(description).result}
          </p>
        </div>
        <div className="flex w-full items-center justify-between p-4">
          <div className="flex flex-1 items-center justify-start space-x-2">
            <p className="inline-flex items-center rounded-full bg-theme-blue/10 px-3 py-1 text-sm font-medium text-theme-dark-blue">
              <DesktopComputerIcon className="mr-1 h-4 w-4" />
              {category}
            </p>
            <p
              className={classNames(
                "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                {
                  "bg-theme-green/10 text-theme-dark-green": !ended,
                  "bg-theme-red/10 text-theme-red": ended,
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
          </div>
          <div>
            {type === "Closed" && <LockClosedIcon className="h-6 w-6" />}
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
  rewardCurrency: PropTypes.string.isRequired,
  totalReward: PropTypes.number.isRequired,
};
