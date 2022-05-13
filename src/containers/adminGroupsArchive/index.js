import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminGroupsArchiveTableHeaderActions from "components/adminGroupsArchiveTableHeaderActions";
import Loading from "components/loading";
import AdminController from "controllers/admin";
import { ADMIN_GROUPS_LIST_USERS_BY_GROUP_TABLE_COLUMNS } from "helpers/constants";
import React, { useEffect, useState } from "react";

export default function AdminGroupsArchive() {
  const groupsListColumns = [
    {
      field: "number",
      headerName: "Խմբի Համար",
      flex: 1,
      renderCell: ({ row }) => (
        <Button onClick={handleGetUsers(row.id)}>
          {row.number} ({row.creationYear})
        </Button>
      ),
    },
    { field: "creationDate", headerName: "Ստեղծման Ամսաթիվ", flex: 1 },
    { field: "graduationDate", headerName: "Ավարտման Ամսաթիվ", flex: 1 },
    {
      flex: 1,
      field: "profession",
      headerName: "Մասնագիտություն",
      renderCell: ({ row }) => <p>{row.profession.name}</p>,
    },
  ];
  const [loading, setLoading] = useState(false);
  const [groupsList, setGroupsList] = useState([]);
  const [usersByGroup, setUsersByGroup] = useState(null);
  useEffect(() => {
    getGroupsList();
  }, []);

  const getGroupsList = async () => {
    setLoading(true);
    await AdminController.getAllGroupsList()
      .then((res) => setGroupsList(res))
      .finally(() => setLoading(false));
  };

  const handleGetUsers = (groupId) => async () => {
    setLoading(true);
    await AdminController.getUsersByGroup(groupId)
      .then((res) => setUsersByGroup(res))
      .finally(() => setLoading(false));
  };

  const handleReset = () => {
    setUsersByGroup(null);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="table-wrapper">
        {usersByGroup ? (
          <>
            <Button onClick={handleReset}>Հետ Գնալ</Button>
            <DataGrid
              columns={ADMIN_GROUPS_LIST_USERS_BY_GROUP_TABLE_COLUMNS}
              rows={usersByGroup}
            />
          </>
        ) : (
          <>
            <AdminGroupsArchiveTableHeaderActions
              setGroupsList={setGroupsList}
            />

            <DataGrid columns={groupsListColumns} rows={groupsList} />
          </>
        )}
      </div>
    </>
  );
}
