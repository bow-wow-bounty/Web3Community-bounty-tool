import axios from "axios";

import setupInterceptors from "./interceptors";

const baseURL =
  process.env.NEXT_PUBLIC_CORE_API_BASE_URL ||
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;

const Api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(Api);

export default Api;
