import "../styles/globals.css";

import Head from "next/head";
import PropTypes from "prop-types";

import Modules from "../modules";
import { preview } from "./dashboard/preview.jpg";

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
        <meta property="og:image" content={preview} key="og-image" />
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
