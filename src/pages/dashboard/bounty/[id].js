import noSsr from "../../../utils/no-ssr";

const BountyDashboardWithoutSSR = noSsr(() =>
  import("../../../app/dashboard/bounty")
);

export default BountyDashboardWithoutSSR;
