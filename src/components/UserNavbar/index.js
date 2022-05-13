import UserSelect from 'components/userSelect';
import React from 'react';
import routes from "routes/routes";
import { Link } from "react-router-dom";
import "./style.scss";

const UserNavbar = ({setLoading, isLoggedIn}) => {

  return (

    <div>
      <Link className="header-logo" to="/user">ԵԻՊՔ ԳՐԱԴԱՐԱՆ</Link>
      <Link to={routes.bookList}>ԳՐՔԵՐԻ ՑԱՆԿ</Link>
      <Link to={routes.myBooks}>ԻՄ ԳՐՔԵՐԸ</Link>
      {isLoggedIn ? <UserSelect setLoading={setLoading}/> : <Link to="/login">ՄՈՒՏՔ</Link>}
      
    </div>
  );
};

export default UserNavbar;