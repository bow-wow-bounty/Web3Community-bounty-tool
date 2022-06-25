import noSSR from "../../../utils/no-ssr";

const SubmissionWithoutSSR = noSSR(() =>
  import("../../../app/bounty/submission")
);

export default SubmissionWithoutSSR;
