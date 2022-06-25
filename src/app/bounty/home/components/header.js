import { LockClosedIcon } from "@heroicons/react/outline";
import {
  CheckCircleIcon,
  DesktopComputerIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import PropTypes from "prop-types";
import { stripHtml } from "string-strip-html";

import Button, { ButtonVariant } from "../../../../components/button";
import Link from "../../../../components/link";

const Header = ({
  bounty: {
    id,
    image,
    title,
    deadline,
    totalReward,
    description,
    category,
    ended,
    type,
  },
}) => {
  return (
    <div className="relative flex items-center rounded-lg bg-theme-orange p-8 shadow">
      <div className="relative mr-4 aspect-[16/9] w-1/4 overflow-hidden rounded-md">
        <Image layout="fill" src={image} alt={title} objectFit="cover" />
      </div>
      <div className="flex-1">
        <div className="py-4">
          <p className="text-xs">Deadline: {new Date(deadline).toString()}</p>
          <p className="font-display text-2xl">{title}</p>
          <p className="text-sm line-clamp-2">
            {stripHtml(description).result}
          </p>
        </div>
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex flex-1 items-center justify-start space-x-2">
            <p className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium">
              <DesktopComputerIcon className="mr-1 h-4 w-4" />
              {category}
            </p>
            <p className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium">
              <CheckCircleIcon className="mr-1 h-4 w-4" />
              {!ended ? "Active" : "Expired"}
            </p>
            <p className="rounded-full border border-black bg-black py-1.5 px-4 text-xs font-bold text-white">
              <span className="block translate-y-[1px]">${totalReward}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="pr-8">
        <Link href={`/bounty/${id}/submission`} noUnderline>
          <Button variant={ButtonVariant.PrimaryBW} className="flex text-lg">
            <div className="mr-3 rounded-sm bg-white p-0.5 text-black">
              <PlusIcon className="h-3 w-3" />
            </div>
            Add A Submission
          </Button>
        </Link>
        <div className="absolute bottom-0 right-0 m-6">
          {type === "closed" && <LockClosedIcon className="h-6 w-6" />}
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  bounty: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    totalReward: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ended: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
