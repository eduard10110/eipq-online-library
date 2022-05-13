import { toast } from "react-toastify";
import API from "service";
import { saveUserInfo } from "store/action-creators/userInfo";
import store from "store/app";

const { Hosts, Controllers, Methods } = require("helpers/constants");

const SignInController = {};

SignInController.login = async (body) => {
  const response = await API.POST(Hosts.BASE_URL, Methods.login, "", body);
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response;
};

SignInController.adminLogin = async (body) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Methods.adminLogin,
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response;
};

SignInController.register = async (data) => {
  const response = await API.POST(
    Hosts.BASE_URL,
    Controllers.register,
    "",
    data
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success(response.data.message);
  return response;
};

SignInController.getUserRoleWithToken = async () => {
  const token = localStorage.getItem("token");
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.getUserRoleByToken,
    "",
    { token }
  );
  return response.data;
};

SignInController.refreshAdmin = async () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    `${Controllers.admin}/${Controllers.identity}`,
    Controllers.refresh,
    { refreshToken, token }
  );
  if (response.data.hasError) {
    return false;
  }
  return response;
};

SignInController.refreshUser = async () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await API.POST(Hosts.BASE_URL, Controllers.refresh, "", {
    refreshToken,
    token,
  });
  if (response.data.hasError) {
    return false;
  }
  return response;
};

SignInController.adminLogOut = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    `${Controllers.admin}/${Controllers.identity}`,
    Methods.logOut
  );
  if (response.data.hasError) {
    return toast.error("error");
  }
  store.dispatch(saveUserInfo({}));
};

export default SignInController;
