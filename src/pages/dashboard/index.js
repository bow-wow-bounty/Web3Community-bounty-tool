import noSsr from "../../utils/no-ssr";

const DashboardWithoutSSR = noSsr(() => import("../../app/dashboard/home"));

export default DashboardWithoutSSR;
