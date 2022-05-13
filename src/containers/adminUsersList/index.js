import { Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminUsersListHeaderActions from "components/adminUsersListHeaderActions";
import Loading from "components/loading";
import AdminController from "controllers/admin";
import React, { useEffect, useState } from "react";
import "./index.scss";
import EditIcon from "@mui/icons-material/Edit";
import AdminUserEditModal from "components/adminUserEditModal";

export default function AdminUsersList() {
  const ADMIN_USERS_LIST_COLUMNS = [
    { flex: 1, headerName: "Անուն", field: "firstname" },
    { flex: 1, headerName: "Ազգանուն", field: "lastname" },
    { width: 60, headerName: "Խմբի համար", field: "groupNumber" },
    {
      flex: 1,
      headerName: "ՈՒսանողական Քարտի համար",
      field: "studentCardNumber",
    },
    { width: 120, headerName: "Կարգավիճակ", field: "status" },
    {
      flex: 1,
      field: "actions",
      type: "actions",
      renderCell: ({ row }) => {
        return (
          <>
            {row.status === "Inactive" ? (
              <>
                <Button onClick={handleConfirmUser(row.id)}>հաստատել</Button>
                <Button onClick={handleDeleteUser(row.id)}>մերժել</Button>
              </>
            ) : row.status === "Blocked" ? (
              <Button onClick={handleConfirmUser(row.id)}>Ակտիվացնել</Button>
            ) : (
              <Button onClick={handleDeActivateUser(row.id)}>
                Ապաակտիվացնել
              </Button>
            )}
            <IconButton onClick={handleUserEditChange(true, row)}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const [userEditModalData, setUserEditModalData] = useState({
    open: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getUsersList();
  }, []);

  const handleDeleteUser = (userId) => async () => {
    setLoading(true);
    await AdminController.deleteUser({ userId });
    await getUsersList();
    setLoading(false);
  };

  const handleUserEditChange = (open, data) => () =>
    setUserEditModalData({ open, data });

  const getUsersList = async () => {
    setLoading(true);
    await AdminController.getUsersList()
      .then((res) => res && setUserList(res.data))
      .finally(() => setLoading(false));
  };

  const handleConfirmUser = (userId) => async () => {
    setLoading(true);
    await AdminController.confirmUser({ userId });
    await getUsersList();
    setLoading(false);
  };

  const handleDeActivateUser = (id) => async () => {
    setLoading(true);
    await AdminController.ChangeUserStatus({ id, status: 2 });
    await getUsersList();
    setLoading(false);
  };

  return (
    <>
      {userEditModalData.open && (
        <AdminUserEditModal
          {...userEditModalData}
          onClose={handleUserEditChange}
          setLoading={setLoading}
          getUsersList={getUsersList}
        />
      )}
      {loading && <Loading />}
      <div className="users-list-table-wrapper">
        <AdminUsersListHeaderActions setUserList={setUserList} />
        <DataGrid columns={ADMIN_USERS_LIST_COLUMNS} rows={userList} />
      </div>
    </>
  );
}
