import AccountantNewBookCreationRequests from "containers/accountantNewBookCreationRequests";
import AccountantRemovableBookRequests from "containers/accountantRemovableBookRequests";
import AdminBooksList from "containers/adminBooksList";
import AdminGroupsArchive from "containers/adminGroupsArchive";
import AdminNewReservations from "containers/adminNewReservations";
import AdminUsersList from "containers/adminUsersList";
import SuperAdminAdmins from "containers/superAdminAdmins";

export const Hosts = {
  BASE_URL: "BASE_URL",
  PUBLIC_URL: "PUBLIC_URL",
};

export const Methods = {
  delete: "users/delete",
  users: "users",
  groups: "groups",
  getUserRole: "getUserRole",
  login: "login",
  adminLogin: "identity/login",
  categories: "categories",
  reservations: "reservations",
  logOut: "logOut",
  BookCreationRequests: "BookCreationRequests",
  confirmUser: "users/confirm",
  changeUserStatus: "users/changeStatus",
  getEndingSoonReservations: "reservations/getEndingSoonReservations",
  myReservations: "myReservations",
  cancel: "cancel",
};

export const Controllers = {
  changePassword: "change-password",
  identity: "identity",
  getUserRoleByToken: "getUserRoleByToken",
  refresh: "refresh",
  profession: "Profession",
  register: "register",
  books: "books",
  admin: "admin",
  admins: "admins",
  BookCreationRequests: "BookCreationRequests",
  bookDeletionRequests: "bookDeletionRequests",
};

export const HostUrls = {
  BASE_URL: "https://feodal-brnapet.me/api",
  PUBLIC_URL: "https://admin.feodal-brnapet.me/api",
};

export const USER_TYPES = {
  accountant: 0,
  librarian: 1,
  superAdmin: 2,
  student: 3,
};

export const USER_TYPE_WITH_TRANSLATION = {
  Accountant: "հաշվապահ",
  Librarian: "Գրադարանավար",
  SuperAdmin: "Սուպեր Ադմին",
  Student: "Ուսանող",
};

export const USER_NAVIGATION = {
  0: "/accountant",
  1: "/admin",
  2: "/admin",
  3: "/user",
};

export const adminHeaderData = [
  { title: "Գրքերի Ցանկ", Comp: AdminBooksList, id: 0 },
  { title: "Խմբերի Ցանկ", Comp: AdminGroupsArchive, id: 1 },
  { title: "Օգտվողների Ցանկ", Comp: AdminUsersList, id: 2 },
  { title: "նոր հայտեր", Comp: AdminNewReservations, id: 3 },
];

export const superAdminHeaderData = [
  { title: "Գրքերի Ցանկ", Comp: AdminBooksList, id: 0 },
  { title: "Խմբերի Ցանկ", Comp: AdminGroupsArchive, id: 1 },
  { title: "Օգտվողների Ցանկ", Comp: AdminUsersList, id: 2 },
  { title: "նոր հայտեր", Comp: AdminNewReservations, id: 3 },
  { title: "Ադմիններ", Comp: SuperAdminAdmins, id: 4 },
];

export const ADMIN_CREATE_NEW_BOOK_LIST_INPUTS = [
  { title: "Անուն", id: "name" },
  { title: "հեղինակ", id: "author" },
  { title: "արտադրության տարեթիվ", id: "productionYear", type: "number" },
  { title: "նկարագրությունը", id: "description" },
  { title: "էջերի քանակ", id: "pagesCount", type: "number" },
  { title: "Գրքերի քանակ", id: "quantity", type: "number", disabled: true },
  {
    title: "Հասանելի պատվիրելու համար",
    id: "availableForBorrowingCount",
    type: "number",
  },
  {
    title: "Հասանելի Գրադարանում Կարդալու համար",
    id: "availableForUsingInLibraryCount",
    type: "number",
  },
];

export const ADMIN_RESERVATIONS_TABLE_ACTION_BUTTONS = [
  { title: "հաստատել", id: 2, accessWith: 0 },
  { title: "Չեղարկել", id: 1, accessWith: 0 },
  { title: "Վերադարձնել", id: 3, accessWith: 2 },
];

export const AdminReservationStatuses = {
  Reserved: 0,
  Canceled: 1,
  Borrowed: 2,
  Returned: 3,
};

export const ADMIN_USER_RESERVATIONS_COLUMNS = [
  { headerName: "հայտի Ստեղծման Ամսաթիվ", field: "creationDate", flex: 1 },
  {
    headerName: "սպասվող վերցման ամսաթիվ",
    field: "expectedBorrowingDate",
    width: 120,
  },
  {
    headerName: "սպասվող հանձնման ամսաթիվ",
    field: "expectedReturnDate",
    width: 120,
  },
  {
    headerName: "Կարգավիճակ",
    field: "status",
    width: 120,
  },
  {
    flex: 1,
    headerName: "Գիրք",
    field: "book",
    renderCell: ({ row }) => {
      return (
        <h5>
          {row.book?.author} {row.book?.name}
        </h5>
      );
    },
  },
  {
    flex: 1,
    headerName: "Օգտատեր",
    field: "user",
    renderCell: ({ row }) => (
      <h5 className="row-user">
        {row.user?.firstname} {row.user.lastname} ({row.user.groupNumber})
      </h5>
    ),
  },
];

export const SUPER_ADMIN_ADD_NEW_ADMIN = [
  { id: "firstName", title: "Անուն" },
  { id: "lastName", title: "Ազգանուն" },
  { id: "email", title: "Էլ։ Փոստ", type: "email" },
];

export const adminBookDeletionReasons = [
  "GivenAway",
  "Makulatura",
  "Destroyed",
  "Lost",
];

export const ACCOUNTANT_TABS = [
  {
    id: 0,
    title: "Նոր Գրքերի Հայտեր",
    Comp: AccountantNewBookCreationRequests,
  },
  {
    id: 1,
    title: "Հեռացվող Գրքերի Հայտեր",
    Comp: AccountantRemovableBookRequests,
  },
];

export const ADMIN_GROUPS_LIST_USERS_BY_GROUP_TABLE_COLUMNS = [
  { width: 60, headerName: "Id", field: "id" },
  { flex: 1, headerName: "Անուն", field: "firstname" },
  { flex: 1, headerName: "Ազգանուն", field: "lastname" },
  { width: 60, headerName: "Խմբի համար", field: "groupNumber" },
  {
    flex: 1,
    headerName: "ՈՒսանողական Քարտի համար",
    field: "studentCardNumber",
  },
  { width: 120, headerName: "Կարգավիճակ", field: "status" },
];
