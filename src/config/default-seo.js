const defaultSeo = {
  title: "ThugDAO Bounty Tool",
  titleTemplate: "%s | ThugDAO Bounty Tool",
  description: `Welcome to ThugDAO Bounty Tool!`,
  openGraph: {
    url: `https://${
      process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    }`,
    title: "ThugDAO Bounty Tool",
    description: `Welcome to ThugDAO Bounty Tool!`,
    site_name: "ThugDAO Bounty Tool",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
  images: [
    {
      url: "https://i.ibb.co/bv79Sf9/Screenshot-from-2022-08-04-08-20-03.png",
      width: 800,
      height: 600,
      alt: "Og Image Alt",
      type: "image/png",
    },
  ],
};

export default defaultSeo;
