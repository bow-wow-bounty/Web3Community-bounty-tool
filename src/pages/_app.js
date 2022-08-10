import "../styles/globals.css";

import Head from "next/head";
import PropTypes from "prop-types";

import Modules from "../modules";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
      />
      <Head>
        <title>BowWow Bounty Tool</title>
        <meta
          property="og:title"
          content="Welcome to BowWow Bounty Tool"
          key="title"
        />
      </Head>
      <Modules>
        <Component {...pageProps} />
      </Modules>
    </>
  );
};

export default App;

App.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};
