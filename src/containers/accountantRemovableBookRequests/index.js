import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AccountantBookRequestsListTableHeaderActions from "components/accountantBookRequestsListTableHeaderActions";
import AccountantConfirmBookCreationRequestData from "components/accountantConfirmBookCreationRequestData";
import Loading from "components/loading";
import AccountantController from "controllers/accountant";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { bookDeletionRequestsListSelector } from "store/selectors/app";
import "./index.scss";

export default function AccountantRemovableBookRequests() {
  const columns = [
    { field: "bookName", headerName: "Գրքի Անուն", flex: 1 },
    { field: "bookAuthor", headerName: "Հեղինակ", flex: 1 },
    { field: "count", headerName: "Քանակ", width: 120 },
    { field: "status", headerName: "Կարգավիճակ", width: 120 },
    { field: "note", headerName: "Նշումներ", flex: 1 },
    { field: "deletionReason", headerName: "Հեռացման Պատճառը", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      flex: 1,
      renderCell: ({ row }) =>
        row.status === "Pending" && (
          <>
            <Button
              onClick={handelConfirmRequestModalChange(row.id, true, "confirm")}
            >
              հաստատել
            </Button>
            <Button
              onClick={handelConfirmRequestModalChange(row.id, true, "reject")}
            >
              Չեղարկել
            </Button>
          </>
        ),
    },
  ];
  const allBookDeletionRequest = useSelector(
    bookDeletionRequestsListSelector,
    shallowEqual
  ).data;
  const [loading, setLoading] = useState(false);
  const [bookDeletionRequests, setBookDeletionRequests] = useState([]);
  const [confirmModalData, setConfirmModalData] = useState({
    open: false,
    requestId: null,
    type: null,
  });

  useEffect(() => {
    getBookDeletionRequests();
  }, []);

  const getBookDeletionRequests = async () => {
    setLoading(true);
    await AccountantController.getBookDeletionRequests()
      .then((res) => setBookDeletionRequests(res.data))
      .finally(() => setLoading(false));
  };

  const handelConfirmRequestModalChange = (requestId, payload, type) => () => {
    setConfirmModalData({ open: payload, requestId, type });
  };

  const handleConfirmRequest = (accountantMessage) => async () => {
    setLoading(true);
    confirmModalData.type === "create"
      ? await AccountantController.ConfirmBookDeletionRequest(
          { accountantMessage },
          confirmModalData.requestId
        )
      : await AccountantController.RejectBookDeletionRequest(
          { accountantMessage },
          confirmModalData.requestId
        );
    await getBookDeletionRequests();
    handelConfirmRequestModalChange(null, false, null);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      {confirmModalData.open && (
        <AccountantConfirmBookCreationRequestData
          {...confirmModalData}
          onClose={handelConfirmRequestModalChange}
          handleSubmit={handleConfirmRequest}
        />
      )}
      <div className="table-wrapper">
        <AccountantBookRequestsListTableHeaderActions
          setBookCreationRequests={setBookDeletionRequests}
          bookCreationRequests={allBookDeletionRequest}
        />
        <DataGrid columns={columns} rows={bookDeletionRequests} />
      </div>
    </>
  );
}
