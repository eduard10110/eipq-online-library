import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminBookDeleteModal from "components/adminBookDeleteModal";
import AdminBookEditModal from "components/adminBookEdit";
import BookListTableHeaderActions from "components/bookListTableHeaderActions";
import Loading from "components/loading";
import UserController from "controllers/user";
import React, { useEffect, useState } from "react";
import "./index.scss";

export default function AdminBooksList() {
  const ADMIN_BOOKS_LIST_COLUMNS = [
    { headerName: "Անուն", field: "name", flex: 1 },
    { headerName: "հեղինակ", field: "author", flex: 1 },
    { headerName: "արտադրության տարեթիվ", field: "productionYear", flex: 1 },
    { headerName: "էջերի քանակ", field: "pagesCount", flex: 1 },
    { headerName: "նկարագրությունը", field: "description", flex: 1 },
    { headerName: "Գրքերի քանակ", field: "totalCount", flex: 1 },
    {
      headerName: "Հասանելի պատվիրելու համար",
      field: "availableForBorrowingCount",
      flex: 1,
    },
    {
      headerName: "Հասանելի Գրադարանում Կարդալու համար",
      field: "availableForUsingInLibraryCount",
      flex: 1,
    },
    {
      flex: 1,
      field: "actions",
      type: "actions",
      renderCell: (row) => {
        return (
          <>
            <IconButton onClick={handleEdit(row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteBook(true, row.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const [editModalData, setEditModalData] = useState({
    isOpened: false,
    editableBook: {},
  });
  const [deleteModalData, setDeleteModalData] = useState({
    open: false,
    bookId: null,
  });
  const [loading, setLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const handleEdit = (id) => () =>
    setEditModalData({
      isOpened: true,
      editableBook: bookList.find((elem) => elem.bookId === id),
    });

  const handleDeleteBook = (payload, bookId) => () =>
    setDeleteModalData({ open: payload, bookId });

  const getBookList = async () => {
    setLoading(true);
    return await UserController.getBookList()
      .then((res) =>
        setBookList(res.data.data.map((elem) => ({ ...elem, id: elem.bookId })))
      )
      .finally(() => setLoading(false));
  };

  const handleCloseEditModal = (payload) => () => {
    setEditModalData({ isOpened: payload, editableBook: {} });
  };
  useEffect(() => {
    getBookList();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div>
        {deleteModalData.open && (
          <AdminBookDeleteModal
            {...deleteModalData}
            onClose={handleDeleteBook}
            setLoading={setLoading}
            getBookList={getBookList}
          />
        )}
        <AdminBookEditModal onClose={handleCloseEditModal} {...editModalData} />
        <div className="bookList-table-wrapper">
          <BookListTableHeaderActions setBookList={setBookList} />
          <DataGrid rows={bookList} columns={ADMIN_BOOKS_LIST_COLUMNS} />
        </div>
      </div>
    </>
  );
}
