import { Controllers, Hosts } from "helpers/constants";
import { toast } from "react-toastify";
import API from "service";
import store from "store/app";
import {
  saveBookCreationRequest,
  saveBookDeletionRequests,
} from "../store/action-creators/app";

const AccountantController = {};

AccountantController.getBookCreationRequests = async () => {
  const response = await API.GET(
    Hosts.PUBLIC_URL,
    Controllers.BookCreationRequests,
    ""
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  store.dispatch(saveBookCreationRequest(response.data));
  return response.data;
};

AccountantController.ConfirmRequest = async (body, requestId) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.BookCreationRequests,
    `${requestId}/confirm`,
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};
AccountantController.rejectConfirmRequest = async (body, requestId) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.BookCreationRequests,
    `${requestId}/reject`,
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};

AccountantController.deleteBook = async (id) => {
  const response = await API.DELETE(
    Hosts.PUBLIC_URL,
    Controllers.BookCreationRequests,
    id
  );

  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};

AccountantController.getBookDeletionRequests = async () => {
  const response = await API.GET(
    Hosts.PUBLIC_URL,
    Controllers.bookDeletionRequests,
    ""
  );

  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  store.dispatch(saveBookDeletionRequests(response.data));
  return response.data;
};

AccountantController.ConfirmBookDeletionRequest = async (body, requestId) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.bookDeletionRequests,
    `${requestId}/confirm`,
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};
AccountantController.RejectBookDeletionRequest = async (body, requestId) => {
  const response = await API.POST(
    Hosts.PUBLIC_URL,
    Controllers.bookDeletionRequests,
    `${requestId}/reject`,
    body
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  toast.success("Success");
  return response.data;
};

export default AccountantController;
