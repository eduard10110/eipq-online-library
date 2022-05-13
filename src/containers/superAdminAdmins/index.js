import { DataGrid } from "@mui/x-data-grid";
import Loading from "components/loading";
import SuperAdminAdminsHeaderActions from "components/superAdminAdminsHeaderActions";
import AdminController from "controllers/admin";
import { USER_TYPE_WITH_TRANSLATION } from "helpers/constants";
import React, { useEffect, useState } from "react";
import "./index.scss";

export default function SuperAdminAdmins() {
  const columns = [
    { flex: 1, headerName: "Անուն Ազգանուն", field: "name" },
    { flex: 1, headerName: "Էլ. Փոստ", field: "email" },
    { flex: 1, headerName: "Հեռախոսահամար", field: "phoneNumber" },
    {
      flex: 1,
      headerName: "Պաշտոն",
      field: "occupation",
      renderCell: ({ row }) => (
        <p>{USER_TYPE_WITH_TRANSLATION[row.occupation]}</p>
      ),
    },
    { flex: 1, headerName: "ակտիվ է", field: "isActive" },
  ];

  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    getAdminsList();
  }, []);
  const getAdminsList = async () => {
    setLoading(true);
    await AdminController.getAdminsList().then(
      (res) => res && setAdmins(res.data)
    );
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}
      <div className="table-wrapper">
        <SuperAdminAdminsHeaderActions
          setAdmins={setAdmins}
          setLoading={setLoading}
        />
        <DataGrid rows={admins} columns={columns} />
      </div>
    </>
  );
}
