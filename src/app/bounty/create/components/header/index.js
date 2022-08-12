import Image from "next/image";

import logo from "../../../../../assets/logo-small.svg";

const Header = () => {
  return (
    <div className="flex items-center rounded-lg bg-theme-orange p-8 shadow">
      <div className="mr-8 w-28">
        <div className="relative aspect-[1] h-full">
          <Image src={logo} layout="fill" alt="Logo" objectFit="contain" />
        </div>
      </div>
      <div className="flex-1">
        <p className="font-display text-3xl">Create a Bounty</p>
        <p className="mt-3 max-w-3xl text-sm font-light leading-tight">
          The Bounty Hub community is the glue that holds us all together,
          within our flock we have some of the most diamond winged individuals
          on the planet. Our mission is simply to create an environment that
          exemplifies kindness. The Bounty Hub community is the glue that holds
          us all together, within our flock we have some of the most diamond
          winged individuals on the planet.
        </p>
      </div>
    </div>
  );
};

export default Header;
