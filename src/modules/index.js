import { ChildrenPropType } from "../utils/prop-types";
import SeoConfig from "./seo-config";
import SwrConfig from "./swr-config";

const Modules = ({ children }) => {
  return (
    <SwrConfig>
      <SeoConfig>{children}</SeoConfig>
    </SwrConfig>
  );
};

export default Modules;

Modules.propTypes = {
  children: ChildrenPropType.isRequired,
};
