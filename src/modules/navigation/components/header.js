import { PlusCircleIcon, ViewGridIcon } from "@heroicons/react/solid";

import Button, { ButtonVariant } from "../../../components/button";
import Link from "../../../components/link";

const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex min-h-[72px] w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center">
        <Link href="/">
          <div>
            <div>Logo</div>
          </div>
        </Link>
        <div className="flex flex-1 justify-end space-x-4">
          <Button variant={ButtonVariant.Secondary}>
            <ViewGridIcon className="mr-1 h-5 w-5 translate-y-[1px]" />
            Dashboard
          </Button>
          <Button variant={ButtonVariant.Secondary}>
            <PlusCircleIcon className="mr-1 h-5 w-5 translate-y-[1px]" />
            Create Bounty
          </Button>
          <Button variant={ButtonVariant.Primary}>Connect Wallet</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
