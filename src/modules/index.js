import AuthStore from "../stores/auth-store";
import { ChildrenPropType } from "../utils/prop-types";
import Navigation from "./navigation";
import SeoConfig from "./seo-config";
import SwrConfig from "./swr-config";
import WalletProvider from "./wallet-provider";

const Modules = ({ children }) => {
  return (
    <WalletProvider>
      <SwrConfig>
        <SeoConfig>
          <AuthStore.Provider>
            <Navigation>{children}</Navigation>
          </AuthStore.Provider>
        </SeoConfig>
      </SwrConfig>
    </WalletProvider>
  );
};

export default Modules;

Modules.propTypes = {
  children: ChildrenPropType.isRequired,
};
