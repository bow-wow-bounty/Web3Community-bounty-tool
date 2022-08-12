const defaultSeo = {
  title: "Bounty Hub",
  titleTemplate: "%s | Bounty Hub ",
  description: `Welcome to Bounty Hub !`,
  openGraph: {
    url: `https://${
      process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    }`,
    title: "Bounty Hub ",
    description: `Welcome to Bounty Hub !`,
    site_name: "Bounty Hub ",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

export default defaultSeo;
