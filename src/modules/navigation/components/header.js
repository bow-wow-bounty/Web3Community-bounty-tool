import { PlusCircleIcon, ViewGridIcon } from "@heroicons/react/solid";

import Button, { ButtonVariant } from "../../../components/button";

const Header = () => {
  return (
    <div className="w-full py-4 shadow">
      <div className="container mx-auto flex items-center">
        <div>
          <div>Logo</div>
        </div>
        <div className="flex flex-1 justify-end space-x-4">
          <Button variant={ButtonVariant.Secondary} disabled>
            <ViewGridIcon className="mr-1 h-5 w-5 translate-y-[1px]" />
            Dashboard
          </Button>
          <Button variant={ButtonVariant.Secondary} disabled>
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
