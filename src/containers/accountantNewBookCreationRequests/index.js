import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AccountantBookRequestsListTableHeaderActions from "components/accountantBookRequestsListTableHeaderActions";
import AccountantConfirmBookCreationRequestData from "components/accountantConfirmBookCreationRequestData";
import Loading from "components/loading";
import AccountantController from "controllers/accountant";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { bookCreationListSelector } from "store/selectors/app";
import "./index.scss";

export default function AccountantNewBookCreationRequests() {
  const columns = [
    { field: "name", headerName: "Գրքի Անուն", flex: 1 },
    { field: "author", headerName: "Հեղինակ", flex: 1 },
    { field: "productionYear", headerName: "Գրքի Տարեթիվ", flex: 1 },
    { field: "quantity", headerName: "Ընդհանուր Քանակ", width: 120 },
    {
      field: "availableForBorrowingCount",
      headerName: "Հասանելի պատվիրելու համար",
      width: 120,
    },
    {
      field: "availableForUsingInLibraryCount",
      headerName: "Հասանելի Գրադարանում Կարդալու համար",
      width: 120,
    },
    { field: "pagesCount", headerName: "Էջերի Քանակ", width: 120 },
    { field: "requestStatus", headerName: "Կարգավիճակ", width: 120 },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      flex: 1,
      renderCell: ({ row }) =>
        row.requestStatus === "Pending" && (
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
  const allBookCreationRequests = useSelector(
    bookCreationListSelector,
    shallowEqual
  ).data;
  const [confirmModalData, setConfirmModalData] = useState({
    open: false,
    requestId: null,
    type: null,
  });
  const [bookCreationRequests, setBookCreationRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBookCreationRequests();
  }, []);
  const getBookCreationRequests = async () => {
    setLoading(true);
    await AccountantController.getBookCreationRequests().then((res) =>
      setBookCreationRequests(res.data)
    );
    setLoading(false);
  };

  const handelConfirmRequestModalChange = (requestId, payload, type) => () => {
    setConfirmModalData({ open: payload, requestId, type });
  };

  const handleConfirmRequest = (comment) => async () => {
    setLoading(true);
    confirmModalData.type === "confirm"
      ? AccountantController.ConfirmRequest(
          { accountantMessage: comment },
          confirmModalData.requestId
        )
      : AccountantController.rejectConfirmRequest(
          { accountantMessage: comment },
          confirmModalData.requestId
        );
    handelConfirmRequestModalChange({
      open: false,
      requestId: null,
      type: null,
    });
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <AccountantConfirmBookCreationRequestData
        {...confirmModalData}
        onClose={handelConfirmRequestModalChange}
        handleSubmit={handleConfirmRequest}
      />
      <div className="table-wrapper">
        <AccountantBookRequestsListTableHeaderActions
          setBookCreationRequests={setBookCreationRequests}
          bookCreationRequests={allBookCreationRequests}
        />
        <DataGrid columns={columns} rows={bookCreationRequests} />
      </div>
    </>
  );
}
