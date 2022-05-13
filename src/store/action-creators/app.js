import * as actionTypes from "../action-types/app";

export const showBooksBasketContainer = (payload) => ({
  type: actionTypes.SHOW_BOOKS_BASKET_CONTAINER,
  payload,
});

export const BooksBasketListChange = (payload) => ({
  type: actionTypes.BOOKS_BASKET_LIST_CHANGE,
  payload,
});
export const setBooksList = (payload) => ({
  type: actionTypes.SET_BOOKS_LIST,
  payload,
});

export const saveUsersList = (payload) => ({
  type: actionTypes.SAVE_USERS_LIST,
  payload,
});

export const saveReservationsList = (payload) => ({
  type: actionTypes.SAVE_RESERVATIONS_LIST,
  payload,
});

export const saveAdminsList = (payload) => ({
  type: actionTypes.SAVE_ADMINS_LIST,
  payload,
});

export const saveBookCreationRequest = (payload) => ({
  type: actionTypes.BOOK_CREATION_REQUESTS_LIST,
  payload,
});

export const saveBookDeletionRequests = (payload) => ({
  type: actionTypes.SAVE_BOOK_DELETION_REQUESTS,
  payload,
});

export const saveGroupsList = (payload) => ({
  type: actionTypes.SAVE_GROUPS_LIST,
  payload,
});
