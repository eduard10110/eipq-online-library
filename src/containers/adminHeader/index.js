import { Tab, Tabs } from "@mui/material";
import Loading from "components/loading";
import UserSelect from "components/userSelect";
import {
  adminHeaderData,
  superAdminHeaderData,
  USER_TYPES,
} from "helpers/constants";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userPersonalInfoSelector } from "store/selectors/userInfo";
import { NavHashLink } from "react-router-hash-link";
import "./index.scss";

export default function AdminHeader({ tabValue, setTabValue }) {
  const [loading, setLoading] = useState(false);
  const user = useSelector(userPersonalInfoSelector);
  const handleTabChange = (e, index) => {
    setTabValue(
      (user.role === USER_TYPES.superAdmin
        ? superAdminHeaderData
        : adminHeaderData)[index]
    );
  };

  return (
    <>
      {loading && <Loading />}
      <div className="header-container-wrapper">
        <div className="header-container">
      
        <div className="navright">
          <NavHashLink smooth to="#header" >
            ԳՐԱԴԱՐԱՆԱՎԱՐ
          </NavHashLink>
        </div>
          <Tabs value={tabValue.id} onChange={handleTabChange}>
            {(user.role === USER_TYPES.superAdmin
              ? superAdminHeaderData
              : adminHeaderData
            ).map(({ title, path }, index) => (
              <Tab label={title} key={index} />
            ))}
          </Tabs>
          <div>
            <UserSelect setLoading={setLoading} />
          </div>
        </div>
      </div>
    </>
  );
}
