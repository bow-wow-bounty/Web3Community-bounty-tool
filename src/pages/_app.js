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
        <title>ThugDAO Bounty Tool</title>
        <meta
          property="og:title"
          content="Welcome to ThugDAO Bounty Tool"
          key="title"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/r7FmtS1/Screenshot-from-2022-08-04-08-20-03.jpg"
          key="og-image"
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
