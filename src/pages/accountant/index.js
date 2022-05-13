import { Tab, Tabs } from "@mui/material";
import Loading from "components/loading";
import UserSelect from "components/userSelect";
import { ACCOUNTANT_TABS } from "helpers/constants";
import React, { useState } from "react";
import { NavHashLink } from "react-router-hash-link";
import "./index.scss";

export default function Accountant() {
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(ACCOUNTANT_TABS[0]);

  const handleTabChange = (e, index) => {
    setTabValue(ACCOUNTANT_TABS[index]);
  };
  return (
    <div>
      {loading && <Loading />}
      <div className="accountant-header-wrapper">
        <div className="accountant-header">
        <div className="navright">
          <NavHashLink smooth to="#header" >
            ՀԱՇՎԱՊԱՀ
          </NavHashLink>
        </div>
          <Tabs value={tabValue.id} onChange={handleTabChange}>
            {ACCOUNTANT_TABS.map((tab) => (
              <Tab label={tab.title} key={tab.id} />
            ))}
          </Tabs>
          <div>
            <UserSelect setLoading={setLoading} />
          </div>
        </div>
      </div>
      <tabValue.Comp />
    </div>
  );
}
