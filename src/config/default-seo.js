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
};

export default defaultSeo;
