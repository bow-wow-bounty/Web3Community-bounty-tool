import "../styles/globals.css";

import PropTypes from "prop-types";

import Modules from "../modules";

const App = ({ Component, pageProps }) => {
  return (
    <Modules>
      <Component {...pageProps} />
    </Modules>
  );
};

export default App;

App.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};
