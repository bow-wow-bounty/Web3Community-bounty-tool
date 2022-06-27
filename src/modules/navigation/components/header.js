import { PlusCircleIcon, ViewGridIcon } from "@heroicons/react/solid";
import Image from "next/image";

import logo from "../../../assets/logo-full.png";
import Button, { ButtonVariant } from "../../../components/button";
import Link from "../../../components/link";
import AuthStore from "../../../stores/auth-store";

const Header = () => {
  const { login, logout, isLoggedIn, isProcessing } = AuthStore.useContainer();

  return (
    <div className="sticky top-0 z-10 flex min-h-[72px] w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center">
        <div className="h-full">
          <Link href="/">
            <div className="relative h-full w-96">
              <Image src={logo} layout="fill" alt="Logo" objectFit="contain" />
            </div>
          </Link>
        </div>
        <div className="flex flex-1 justify-end space-x-4">
          <Link href="/dashboard">
            <Button
              variant={
                !isLoggedIn ? ButtonVariant.Secondary : ButtonVariant.PrimaryBW
              }
              disabled={!isLoggedIn}
            >
              <ViewGridIcon className="mr-1 h-5 w-5 translate-y-[1px]" />
              Dashboard
            </Button>
          </Link>
          <Link href="/bounty/create">
            <Button variant={ButtonVariant.Secondary} disabled={!isLoggedIn}>
              <PlusCircleIcon className="mr-1 h-5 w-5 translate-y-[1px]" />
              Create Bounty
            </Button>
          </Link>
          <Button
            variant={ButtonVariant.Primary}
            onClick={() => (!isLoggedIn ? login() : logout())}
            disabled={isProcessing}
          >
            {isProcessing
              ? "Processing..."
              : !isLoggedIn
              ? "Connect Wallet"
              : "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
