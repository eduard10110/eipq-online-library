import axios from "axios";
import { Hosts, HostUrls } from "helpers/constants";
import store from "store/app";
import { userPersonalInfoSelector } from "../store/selectors/userInfo";

const constructBaseURLFunction = (controller, method) =>
  `${HostUrls.BASE_URL}/${controller}/${method}`;

const constructPublicURLFunction = (controller, method) =>
  `${HostUrls.PUBLIC_URL}/${controller}/${method}`;

const constructUrl = (host) => {
  switch (host) {
    case Hosts.BASE_URL:
      return constructBaseURLFunction;
    case Hosts.PUBLIC_URL:
      return constructPublicURLFunction;
    default:
      return null;
  }
};

export const request = async (
  host,
  reqMethod,
  controller,
  method,
  query,
  data = {},
  headers
) => {
  const token =
    userPersonalInfoSelector(store.getState()).token ||
    localStorage.getItem("token");
  const response = await axios({
    url: constructUrl(host)(controller, method),
    method: reqMethod,
    headers: {
      ...headers,
      "Content-Type": "application/json-patch+json",
      Accept: "text/plain",
      charset: "UTF-8",
      Authorization: token ? `Bearer ${token}` : "",
    },
    data,
  });
  return response;
};
