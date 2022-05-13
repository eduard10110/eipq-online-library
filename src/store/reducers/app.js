import * as actionTypes from "../action-types/app";

const initialState = {
  showBooksBasketContainer: false,
  booksBasket: [],
  bookList: [],
  users: [],
  reservations: [],
  admins: [],
  bookCreationRequests: [],
  bookDeletionRequests: [],
  groupsList: [],
};

export default function appReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SHOW_BOOKS_BASKET_CONTAINER:
      return { ...state, showBooksBasketContainer: payload };
    case actionTypes.BOOKS_BASKET_LIST_CHANGE:
      return { ...state, booksBasket: payload };
    case actionTypes.SET_BOOKS_LIST:
      return { ...state, bookList: payload };
    case actionTypes.SAVE_USERS_LIST:
      return { ...state, users: payload };
    case actionTypes.SAVE_RESERVATIONS_LIST:
      return { ...state, reservations: payload };
    case actionTypes.SAVE_ADMINS_LIST:
      return { ...state, admins: payload };
    case actionTypes.BOOK_CREATION_REQUESTS_LIST:
      return { ...state, bookCreationRequests: payload };
    case actionTypes.SAVE_BOOK_DELETION_REQUESTS:
      return { ...state, bookDeletionRequests: payload };
    case actionTypes.SAVE_GROUPS_LIST:
      return { ...state, groupsList: payload };
    default:
      return { ...state };
  }
}
