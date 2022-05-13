import { Controllers, Hosts, Methods } from "helpers/constants";
import API from "service";
import { setBooksList } from "store/action-creators/app";
import store from "store/app";
import { toast } from "react-toastify";
import { saveUserInfo } from "store/action-creators/userInfo";
const UserController = {};

UserController.getBookList = async () => {
  const response = await API.GET(Hosts.BASE_URL, Controllers.books, "");
  store.dispatch(
    setBooksList(
      response.data.data.map((elem) => ({ ...elem, id: elem.bookId }))
    )
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response;
};

UserController.getBookCategories = async () => {
  const response = await API.GET(Hosts.BASE_URL, Methods.categories, "");
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

UserController.ReserveNewBook = async (books) => {
  const responses = await Promise.all(
    books.map((book) =>
      API.POST(Hosts.BASE_URL, Methods.reservations, "", {
        bookId: book.bookId,
        borrowingDate: book.borrowingDate,
        returnDate: book.returnDate,
      })
    )
  );
  responses.map((res) =>
    res.data.hasError
      ? toast.error(res.data.errorMessage)
      : toast.success("Success")
  );
  return responses;
};

UserController.logOut = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  const response = await API.POST(Hosts.BASE_URL, Methods.logOut, "");
  if (response.data.hasError) {
    return toast.error("error");
  }
  store.dispatch(saveUserInfo({}));
};

UserController.getMyBookReservations = async () => {
  const response = await API.GET(
    Hosts.BASE_URL,
    Methods.reservations,
    Methods.myReservations
  );

  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

UserController.CancelBookReservation = async (id) => {
  const response = await API.POST(
    Hosts.BASE_URL,
    Methods.reservations,
    `${id}/${Methods.cancel}`,
    { id }
  );
  if (response.data.hasError) {
    toast.error(response.data.errorMessage);
    return false;
  }
  return response.data;
};

UserController.changePassword = async (body) => {
  const response = await API.POST(
    Hosts.BASE_URL,
    Controllers.changePassword,
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

export default UserController;
