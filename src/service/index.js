import { request } from "./request";
import { serializeErrorMessage } from "./validationErrorHandler";
const API = {};

const REQ = async (
  host,
  reqMethod,
  controller,
  method,
  data,
  query,
  headers
) => {
  try {
    const response = await request(
      host,
      reqMethod,
      controller,
      method,
      query,
      data,
      headers
    );
    return response;
  } catch (err) {
    return serializeErrorMessage(err);
  }
};

API.PUT = async (host, controller, method, data, query, headers) => {
  return await REQ(host, "put", controller, method, data, query, headers);
};

API.GET = async (host, controller, method, query = {}, headers = {}) => {
  return await REQ(host, "get", controller, method, null, query, headers);
};

API.POST = async (host, controller, method, data, query, headers) => {
  return await REQ(host, "post", controller, method, data, query, headers);
};

API.PATCH = async (host, controller, method, data, query, headers) => {
  return await REQ(host, "patch", controller, method, data, query, headers);
};

API.DELETE = async (host, controller, method, data, query, headers) => {
  return await REQ(host, "delete", controller, method, data, query, headers);
};

export default API;
