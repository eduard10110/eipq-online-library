import { Button } from "@mui/material";
import AdminAddNewGroupModal from "components/adminAddNewGroupModal";
import AdminUsersListFilters from "components/adminUsersListFilters";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { usersListSelector } from "store/selectors/app";

export default function AdminUsersListHeaderActions({ setUserList }) {
  const usersList = useSelector(usersListSelector, shallowEqual).data;
  const [modalsData, setModalsData] = useState({
    addNewGroup: false,
  });

  const handleModalChange = (id, payload) => () => {
    setModalsData({ ...modalsData, [id]: payload });
  };

  const handleFilterFieldChange = (id) => (e) => {
    const value = e.target.value === "all" ? "" : `${e.target.value}`;
    const newData = usersList.filter((user) =>
      `${user[id]}`.toUpperCase().includes(value.toUpperCase())
    );
    setUserList(newData);
  };

  const handleFilterByStatus = (e) => {
    setUserList(usersList.filter((user) => user.status === e.target.value));
  };

  return (
    <>
      <AdminAddNewGroupModal
        open={modalsData.addNewGroup}
        onCLose={handleModalChange}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <AdminUsersListFilters
          handleFilterFieldChange={handleFilterFieldChange}
          handleFilterByStatus={handleFilterByStatus}
        />
        <div>
          <Button onClick={handleModalChange("addNewGroup", true)}>
            Ավելացնել Նոր Խմբի համար
          </Button>
        </div>
      </div>
    </>
  );
}
