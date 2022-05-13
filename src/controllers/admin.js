import API from "../service/index";
import { Controllers, Hosts, Methods } from "helpers/constants";
import { toast } from "react-toastify";
import {
  saveAdminsList,
  saveGroupsList,
  saveReservationsList,
  saveUsersList,
} from "store/action-creators/app";
import store from "store/app";
const AdminController = {};

AdminController.getBookList = async () => {
  const response = await API.GET(Hosts.BASE_URL, Controllers.books, "");
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response;
};

AdminController.CreateNewBook = async (body) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Methods.BookCreationRequests,
    "",
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

AdminController.editBook = async (body) => {
  const response = await API.PUT(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Controllers.books,
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

AdminController.createNewCategory = (body) => {
  const response = API.POST(Hosts.PUBLIC_URL, Methods.categories, "", body);
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

AdminController.getUsersList = async () => {
  const response = await API.GET(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Methods.users
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  store.dispatch(saveUsersList(response.data));
  return response.data;
};

AdminController.confirmUser = async (body) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Methods.confirmUser,
    body
  );
  if (response.data?.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  await AdminController.getUsersList();
  return response?.data;
};

AdminController.ChangeUserStatus = async (body) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Methods.changeUserStatus,
    body
  );
  if (response.data?.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  await AdminController.getUsersList();
  return response?.data;
};
AdminController.deleteUser = async (body) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Methods.delete,
    body
  );
  if (response.data?.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  await AdminController.getUsersList();
  return response?.data;
};

AdminController.getProfessions = async () => {
  const response = await API.GET(Hosts.PUBLIC_URL, Controllers.profession, "");
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

AdminController.addNewGroup = async (body) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Methods.groups,
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};

AdminController.getNewReservations = async () => {
  const response = await API.GET(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Methods.reservations
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  store.dispatch(saveReservationsList(response.data));
  return response.data;
};

AdminController.getEndingSoonReservations = async () => {
  const response = await API.GET(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Methods.getEndingSoonReservations
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

AdminController.UpdateBookReservationStatus = async (id, body) => {
  const response = await API.PATCH(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    `${Methods.reservations}/${id}`,
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};

AdminController.getAdminsList = async () => {
  const response = await API.GET(Hosts.PUBLIC_URL, Controllers.admins, "");
  if ((await response).data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  store.dispatch(saveAdminsList(response.data));
  return response.data;
};

AdminController.getUserReservations = async (userId) => {
  const response = await API.GET(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    `${Methods.reservations}/${userId}`
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

AdminController.createNewAdmin = async (body) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.admins,
    "",
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};

AdminController.deleteBookCreationRequest = async (body) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.bookDeletionRequests,
    "",
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};

AdminController.changePassword = async (body) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    `${Controllers.admin}/${Controllers.identity}`,
    Controllers.changePassword,
    body
  );
  if (!response.data.succeeded) {
    toast.error("Error");
    return false;
  }
  toast.success("Success");
  return response.data;
};

AdminController.upDateUser = async (body) => {
  const response = await API.PUT(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    `${Methods.users}/${body.id}`,
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};

AdminController.getAllGroupsList = async () => {
  const response = await API.GET(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    Methods.groups
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  store.dispatch(saveGroupsList(response.data));
  return response.data;
};

AdminController.getUsersByGroup = async (groupId) => {
  const response = await API.GET(
    Hosts.PUBLIC_URL,
    Controllers.admin,
    `${Methods.groups}/${groupId}/${Methods.users}`
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

export default AdminController;
