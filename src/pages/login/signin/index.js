import Loading from "components/loading";
import AppController from "controllers/app";
import SignInController from "controllers/signIn";
import { USER_NAVIGATION } from "helpers/constants";
import useNavigationWithQueryParams from "helpers/hooks/useNavigationWithQueryParams";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "store/action-creators/userInfo";
import "./style.scss";
import { Link } from "react-router-dom";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigationWithQueryParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLoginInfo, setUserLoginInfo] = useState({
    username: "",
    password: "",
  });
  const handleChange = (type) => (event) => {
    const value = event.target.value;
    setUserLoginInfo({ ...userLoginInfo, [type]: value });
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (
      userLoginInfo.username.length > 0 &&
      userLoginInfo.password.length > 0
    ) {
      const userRole = await AppController.getUserRole(userLoginInfo.username);
      if (userRole?.userExists) {
      }
      const response =
        userRole.userRole === 1
          ? await SignInController.login(userLoginInfo)
          : await SignInController.adminLogin(userLoginInfo);
      if (response.data) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("token", response.data.token);
        dispatch(saveUserInfo(response.data));
        navigate(USER_NAVIGATION[response.data.role]);
      }
    } else {
      return setErrorMessage("Լրացրեք բոլոր դաշտերը։");
    }
    setLoading(false);
  };
  return (
    <div className="base-container">
      <nav>
      <Link to="/">ԵԻՊՔ ԳՐԱԴԱՐԱՆ</Link>
      </nav>
      {loading && <Loading />}
      <form onSubmit={handleSubmit}>
        <div className="content">
          <div className="from">
            <div className="form_group">
              <label className="label" htmlFor="email">
                Էլ․հասցե
              </label>
              <input
                className="input"
                onChange={handleChange("username")}
                value={userLoginInfo.mail}
                type="email"
                name="username"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="form_group">
              <label className="label" htmlFor="password">
                Գաղտնաբառ
              </label>
              <input
                className="input"
                onChange={handleChange("password")}
                value={userLoginInfo.password}
                type="password"
                name="password"
                placeholder="Գաղտնաբառ"
              />
              <Link to="/register" className="registerlink">
                Գրանցում
              </Link>
            </div>
          </div>
        </div>
        <div className="footer">
          <p className="errorMessage">{errorMessage}</p>
          <button className="btn" type="submit">
            Մուտք
          </button>
        </div>
      </form>
    </div>
  );
}
