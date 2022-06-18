import { propOr } from "ramda";

export const setupInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return propOr(undefined, "data", response);
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
