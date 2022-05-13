import { Button } from "@mui/material";
import AddNewAdminModal from "components/addNewAdminModal";
import React, { useState } from "react";

export default function SuperAdminAdminsHeaderActions({
  setAdmins,
  setLoading,
}) {
  const [createNewAdminModalOpened, setCreateNewAdminModalOpened] =
    useState(false);
  const handleAddNewAdminModalChange = (payload) => () => {
    setCreateNewAdminModalOpened(payload);
  };
  return (
    <>
      <AddNewAdminModal
        setLoading={setLoading}
        open={createNewAdminModalOpened}
        onClose={handleAddNewAdminModalChange}
      />
      <div className="admins-list-header-actions">
        <div className="header-filters"></div>
        <div className="header-buttons">
          <Button onClick={handleAddNewAdminModalChange(true)}>
            Ավելացնել Նոր Ադմին
          </Button>
        </div>
      </div>
    </>
  );
}
