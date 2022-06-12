const url = `https://${
  process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
}`;

module.exports = {
  siteUrl: url,
  generateRobotsTxt: true,
};
