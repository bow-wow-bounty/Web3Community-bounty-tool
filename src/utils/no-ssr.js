import dynamic from "next/dynamic";

const noSSR = (importFn) => {
  const Component = dynamic(importFn, { ssr: false });
  // eslint-disable-next-line react/jsx-props-no-spreading,react/display-name,func-names
  return function (props) {
    return <Component {...props} />;
  };
};

export default noSSR;
