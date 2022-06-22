import noSsr from "../../utils/no-ssr";

const CreateBountyWithoutSSR = noSsr(() => import("../../app/bounty/create"));

export default CreateBountyWithoutSSR;
