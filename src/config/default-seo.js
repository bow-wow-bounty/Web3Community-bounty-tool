const defaultSeo = {
  title: "Bowpow Bounty Tool",
  titleTemplate: "%s | Bowpow Bounty Tool",
  description: `Welcome to Bowpow Bounty Tool!`,
  openGraph: {
    url: `https://${
      process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    }`,
    title: "Bowpow Bounty Tool",
    description: `Welcome to Bowpow Bounty Tool!`,
    site_name: "Bowpow Bounty Tool",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

export default defaultSeo;
