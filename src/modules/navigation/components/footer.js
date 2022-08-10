import Image from "next/image";

import logo from "../../../assets/logo-small.svg";

const Footer = () => {
  return (
    <div className="flex min-h-[48px] w-full bg-theme-orange">
      <div className="container mx-auto flex items-center">
        <div className="mr-2 flex h-full items-center">
          <div className="relative h-4/5 w-24">
            <Image src={logo} layout="fill" alt="Logo" objectFit="contain" />
          </div>
        </div>
        <p className="font-display text-lg">
          BowWow<span className="ml-[1px] text-white">dao</span> copyright 2022
        </p>
      </div>
    </div>
  );
};

export default Footer;
