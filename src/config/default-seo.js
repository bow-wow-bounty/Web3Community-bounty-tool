const defaultSeo = {
  title: "BowWow Bounty Tool",
  titleTemplate: "%s | BowWow Bounty Tool",
  description: `Welcome to BowWow Bounty Tool!`,
  openGraph: {
    url: `https://${
      process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    }`,
    title: "BowWow Bounty Tool",
    description: `Welcome to BowWow Bounty Tool!`,
    site_name: "BowWow Bounty Tool",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

export default defaultSeo;
