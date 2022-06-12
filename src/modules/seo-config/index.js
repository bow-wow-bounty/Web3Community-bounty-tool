import { DefaultSeo } from "next-seo";

import defaultSeo from "../../config/default-seo";
import { ChildrenPropType } from "../../utils/prop-types";

const SeoConfig = ({ children }) => {
  return (
    <>
      <DefaultSeo {...defaultSeo} />
      {children}
    </>
  );
};

export default SeoConfig;

SeoConfig.propTypes = {
  children: ChildrenPropType.isRequired,
};
