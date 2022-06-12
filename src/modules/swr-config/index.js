import ms from "ms";
import PropTypes from "prop-types";
import { SWRConfig as SWRLibraryConfig } from "swr";

import { ChildrenPropType } from "../../utils/prop-types";

const SwrConfig = ({ pageProps: { fallback = {} } = {}, children }) => {
  return (
    <SWRLibraryConfig
      value={{
        dedupingInterval: ms("10s"),
        errorRetryCount: 3,
        errorRetryInterval: ms("3s"),
        focusThrottleInterval: ms("30s"),
        refreshInterval: ms("5m"),
        revalidateOnMount: true,
        fallback,
      }}
    >
      {children}
    </SWRLibraryConfig>
  );
};

export default SwrConfig;

SwrConfig.propTypes = {
  children: ChildrenPropType.isRequired,
  pageProps: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    fallBack: PropTypes.object,
  }),
};

SwrConfig.defaultProps = {
  pageProps: {
    fallback: {},
  },
};
