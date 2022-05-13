import API from "service";
import { Hosts, Methods } from "helpers/constants";
import { toast } from "react-toastify";

const AppController = {};

AppController.getGroups = async () => {
  const response = await API.GET(Hosts.BASE_URL, Methods.groups, "");
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response;
};

AppController.getUserRole = async (email) => {
  const response = await await API.POST(
    Hosts.PUBLIC_URL,
    Methods.getUserRole,
    "",
    { email }
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

export default AppController;
