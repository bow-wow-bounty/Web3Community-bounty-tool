import axios from "axios";

import setupInterceptors from "./interceptors";

const baseURL = process.env.NEXT_PUBLIC_CORE_API_BASE_URL;

const Api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(Api);

export default Api;
