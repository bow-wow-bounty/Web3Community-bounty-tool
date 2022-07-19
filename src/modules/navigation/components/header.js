import { PlusCircleIcon, ViewGridIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useMemo } from "react";

import logo from "../../../assets/logo-full.png";
import Button, { ButtonVariant } from "../../../components/button";
import Link from "../../../components/link";
import AuthStore from "../../../stores/auth-store";

const Header = () => {
  const { login, logout, isLoggedIn, isProcessing, user } =
    AuthStore.useContainer();

  const isSuperAdmin = useMemo(
    () => Boolean(user?.roles?.includes("SUPER_ADMIN")),
    [user?.roles]
  );
  const isAdmin = useMemo(
    () => Boolean(user?.roles?.includes("ADMIN")),
    [user?.roles]
  );
  const isCreator = useMemo(
    () => Boolean(user?.roles?.includes("CREATOR")),
    [user?.roles]
  );

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
          {(isCreator || isAdmin) && (
            <Link href="/dashboard">
              <Button
                variant={
                  !isLoggedIn
                    ? ButtonVariant.Secondary
                    : ButtonVariant.PrimaryBW
                }
                disabled={!isLoggedIn}
              >
                <ViewGridIcon className="mr-1 h-5 w-5 translate-y-[1px]" />
                Dashboard
              </Button>
            </Link>
          )}

          {isCreator && (
            <Link href="/bounty/create">
              <Button variant={ButtonVariant.Secondary} disabled={!isLoggedIn}>
                <PlusCircleIcon className="mr-1 h-5 w-5 translate-y-[1px]" />
                Create Bounty
              </Button>
            </Link>
          )}

          {(isSuperAdmin || isAdmin) && (
            <Link href="/admin">
              <Button variant={ButtonVariant.Secondary} disabled={!isLoggedIn}>
                Admin
              </Button>
            </Link>
          )}

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
