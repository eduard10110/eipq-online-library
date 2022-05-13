import Loading from "components/loading";
import SignInController from "controllers/signIn";
import { USER_NAVIGATION } from "helpers/constants";
import useNavigationWithQueryParams from "helpers/hooks/useNavigationWithQueryParams";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RoutesBuilder from "routes/index";
import routes from "routes/routes";
import { saveUserInfo } from "store/action-creators/userInfo";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigationWithQueryParams();
  const [loading, setLoading] = useState(false);

  const getUserInfo = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    let response = null;
    if (refreshToken) {
      setLoading(true);
      const userIsAdmin = await SignInController.getUserRoleWithToken();
      if (userIsAdmin.hasError) {
        setLoading(false);
        navigate(routes.home);
      }
      response = userIsAdmin.isUserAdmin
        ? await SignInController.refreshAdmin()
        : await SignInController.refreshUser();

      if (response) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("token", response.data.token);
        dispatch(saveUserInfo(response.data));
        setLoading(false);
        USER_NAVIGATION[response.data?.role] &&
          navigate(USER_NAVIGATION[response.data.role]);
      } else {
        setLoading(false);
        navigate(routes.home);
      }
    } else {
      navigate(routes.home);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div id="main">
        
        <RoutesBuilder />
      </div>
    </>
  );
}

export default App;
