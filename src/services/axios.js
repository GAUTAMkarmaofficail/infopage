import axios from "axios";
import momentTimezone from "moment-timezone";

import config from "../config";
import { modalNotification } from "../utils";

const APIrequest = async ({
  method,
  url,
  baseURL,
  queryParams,
  bodyData,
  cancelFunction,
  formHeaders,
  removeHeaders,
}) => {
  try {
    const axiosConfig = {
      method: method || "GET",
      baseURL: config.API_BASE_URL,
      headers: {
        "content-type": "application/json",
        "X-Frame-Options": "sameorigin",
        timezone: momentTimezone.tz.guess(true),
      },
    };

    if (formHeaders) {
      axiosConfig.headers = { ...axiosConfig.headers, ...formHeaders };
    }

    if (baseURL) {
      axiosConfig.baseURL = baseURL;
    }

    if (url) {
      axiosConfig.url = url;
    }

    if (queryParams) {
      const queryParamsPayload = {};
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          let element = queryParams[key];
          if (typeof element === "string") {
            element = element.trim();
          }
          if (!["", null, undefined, NaN].includes(element)) {
            queryParamsPayload[key] = element;
          }
        }
      }
      axiosConfig.params = queryParamsPayload;
    }

    if (bodyData) {
      const bodyPayload = {};
      for (const key in bodyData) {
        if (Object.hasOwnProperty.call(bodyData, key)) {
          let element = bodyData[key];
          if (typeof element === "string") {
            element = element.trim();
          }
          if (![null, undefined, NaN].includes(element)) {
            bodyPayload[key] = element;
          }
        }
      }
      axiosConfig.data = bodyPayload;
    }

    if (cancelFunction) {
      axiosConfig.cancelToken = new axios.CancelToken((cancel) => {
        cancelFunction(cancel);
      });
    }

    if (removeHeaders) {
      delete axiosConfig.headers;
    }
    const res = await axios(axiosConfig);
    return res.data;
  } catch (error) {
    console.log(error);
    if (axios.isCancel(error)) {
      throw new Error(error);
    } else {
      const errorRes = error.response;
      if (errorRes && errorRes.status && errorRes.status === 403) {
      }
      if (errorRes && errorRes.status && errorRes.status === 500) {
        modalNotification({
          type: "error",
          message: errorRes.data.message || errorRes.data.error.description,
        });
        return errorRes.data;
      }
      if (errorRes && errorRes.status && errorRes.status === 400) {
        if (errorRes.data.message) {
          modalNotification({
            type: "warning",
            message: errorRes.data.message,
          });
        }
      }
      return null;
    }
  }
};

export default APIrequest;
