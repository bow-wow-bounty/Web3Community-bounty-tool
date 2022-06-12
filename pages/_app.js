import "../styles/globals.css";

import PropTypes from "prop-types";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;

App.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};
