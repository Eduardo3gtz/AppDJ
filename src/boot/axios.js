import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://api.example.com' })

const baseurl = process.env.PROD
  ? process.env.VITE_BASE_URL
  : process.env.VITE_BASE_URL_DEV;

// const cToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWFudWVsQHNhaXQuY29tLm14IiwidXNlciI6dHJ1ZSwiZXhwIjoxNzAwMzI0NDY0LCJpYXQiOjE3MDAxNTE2NjQsImlzcyI6IkZhYnJpY2EgZGUgU29mdHdhcmUgU0FJVCBNRDMifQ.Oj0INdg0IS3hAIubxM2nsoXvjfQIqnwTSXMGJK1OGdc";

const api = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: "Bearer " + cToken,
  },
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
