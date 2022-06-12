import { ChildrenPropType } from "../utils/prop-types";
import SwrConfig from "./swr-config";

const Modules = ({ children }) => {
  return <SwrConfig>{children}</SwrConfig>;
};

export default Modules;

Modules.propTypes = {
  children: ChildrenPropType.isRequired,
};
