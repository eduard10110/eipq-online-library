import Accountant from "pages/accountant";
import Admin from "pages/admin";
import BookList from "pages/bookList";
import { Register } from "pages/login/register";
import { Login } from "pages/login/signin";
import myBooks from "pages/myBooks";
import Start from "pages/start";
import User from "pages/user";
import routes from "routes/routes.js";

const routesData = [
  {
    title: "home",
    path: routes.home,
    Comp: Start,
    exact: true,
  },
  {
    title: "admin",
    path: routes.admin,
    Comp: Admin,
    exact: true,
  },
  {
    title: "user",
    path: routes.user,
    Comp: User,
    exact: true,
  },
  {
    title: "Accountant",
    path: routes.accountant,
    Comp: Accountant,
    exact: true,
  },
  {
    title: "login",
    path: routes.login,
    Comp: Login,
    exact: true,
  },
  {
    title: "register",
    path: routes.register,
    Comp: Register,
    exact: true,
  },
  {
    title: "bookList",
    path: routes.bookList,
    Comp: BookList,
    exact: true,
  },
  {
    title: "myBooks",
    path: routes.myBooks,
    Comp: myBooks,
    exact: true,
  },
];

export default routesData;
