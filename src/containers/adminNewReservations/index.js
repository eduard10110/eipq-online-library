import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminReservationsFilters from "components/adminReservationsFilters";
import AdminUserBookReservations from "components/adminUserBookReservations";
import Loading from "components/loading";
import AdminController from "controllers/admin";
import {
  AdminReservationStatuses,
  ADMIN_RESERVATIONS_TABLE_ACTION_BUTTONS,
} from "helpers/constants";
import React, { useEffect, useState } from "react";
import "./index.scss";

export default function AdminNewReservations() {
  const columns = [
    { headerName: "հայտի Ստեղծման Ամսաթիվ", field: "creationDate", flex: 1 },
    {
      headerName: "սպասվող վերցման ամսաթիվ",
      field: "expectedBorrowingDate",
      width: 120,
    },
    {
      headerName: "սպասվող հանձնման ամսաթիվ",
      field: "expectedReturnDate",
      width: 120,
    },
    {
      headerName: "Կարգավիճակ",
      field: "status",
      width: 120,
    },
    {
      flex: 1,
      headerName: "Գիրք",
      field: "book",
      renderCell: ({ row }) => {
        return (
          <h5>
            {row.book?.author} {row.book?.name}
          </h5>
        );
      },
    },
    {
      flex: 1,
      headerName: "Օգտատեր",
      field: "user",
      renderCell: ({ row }) => (
        <h5 onClick={handleOpenUserModal(row.user, true)} className="row-user">
          {row.user?.firstname} {row.user.lastname} ({row.user.groupNumber})
        </h5>
      ),
    },
    {
      flex: 1,
      headerName: "",
      field: "actions",
      type: "actions",
      renderCell: ({ row }) => {
        return ADMIN_RESERVATIONS_TABLE_ACTION_BUTTONS.map(
          (item) =>
            item.id !== AdminReservationStatuses[row.status] &&
            item.accessWith === AdminReservationStatuses[row.status] && (
              <Button onClick={handleConfirmReservation(row.id, item.id)}>
                {item.title}
              </Button>
            )
        );
        // <Button onClick={handleConfirmReservation(row.id)}>հաստատել</Button>
      },
    },
  ];
  const [userModalData, setUserModalData] = useState({ data: {}, open: false });
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservations();
  }, []);

  const handleOpenUserModal = (userData, open) => () => {
    setUserModalData({ data: userData, open });
  };

  const getReservations = async () => {
    setLoading(true);
    return await AdminController.getNewReservations()
      .then((res) => res.data && setReservations(res.data))
      .finally(() => setLoading(false));
  };

  const handleConfirmReservation = (reservationId, status) => async () => {
    setLoading(true);
    await AdminController.UpdateBookReservationStatus(reservationId, {
      status,
    });
    await getReservations();
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}
      <AdminUserBookReservations
        {...userModalData}
        onClose={handleOpenUserModal}
        setLoading={setLoading}
      />
      <div className="table-wrapper">
        <AdminReservationsFilters
          setReservations={setReservations}
          setLoading={setLoading}
        />
        <DataGrid rows={reservations} columns={columns} />
      </div>
    </>
  );
}
