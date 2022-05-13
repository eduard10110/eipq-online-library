import { Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminController from "controllers/admin";
import { ADMIN_USER_RESERVATIONS_COLUMNS } from "helpers/constants";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminUserBookReservations({
  data,
  open,
  onClose,
  setLoading,
}) {
  const [userReservations, setUserReservations] = useState([]);
  useEffect(() => {
    data.id && getUserReservations();
  }, [data]);

  const getUserReservations = async () => {
    setLoading(true);
    await AdminController.getUserReservations(data.id)
      .then((res) => setUserReservations(res.data))
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    onClose({}, false)();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="user-reservations-modal-wrapper" sx={style}>
        <div className="user-reservations-header">
          <div>
            <h3>
              {data.firstname} {data.lastname} -ի Գրքերը
            </h3>
          </div>
        </div>
        <div className="table-wrapper">
          <DataGrid
            columns={ADMIN_USER_RESERVATIONS_COLUMNS}
            rows={userReservations}
          />
        </div>
      </div>
    </Modal>
  );
}
