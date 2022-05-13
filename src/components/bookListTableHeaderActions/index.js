import { Button, TextField } from "@mui/material";
import AdminAddNewBookModal from "components/adminAddNewBook";
import AdminAddNewCategoryModal from "components/adminAddNewCategoryModal";
import BooksCategoryDropdown from "components/booksCategoryDropdown";
import UserController from "controllers/user";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { bookListSelector } from "store/selectors/app";

export default function BookListTableHeaderActions({ setBookList }) {
  const booksList = useSelector(bookListSelector, shallowEqual);
  const [modals, setModals] = useState({
    newBookModal: false,
    newCategoryModal: false,
  });
  const [bookCategories, setBookCategories] = useState([]);
  const handleOpenNewBookModal = (type, payload) => () => {
    setModals({ ...modals, [type]: payload });
  };

  const handleFilter = (type) => (e) => {
    setBookList(
      booksList.filter((elem) =>
        elem[type].toUpperCase().includes(e.target?.value?.toUpperCase())
      )
    );
  };

  const handleFilterByCategories = (e) => {
    setBookList(
      booksList.filter((elem) => elem.category.id === e.target.value)
    );
  };

  useEffect(() => {
    UserController.getBookCategories().then((res) => setBookCategories(res));
  }, []);

  return (
    <>
      <div className="bookList-headerActions-wrapper">
        <div style={{ display: "flex" }}>
          <TextField
            placeholder="Գրքի Անունով"
            onChange={handleFilter("name")}
          />
          <TextField
            placeholder="Գրքի Հեղինակով"
            onChange={handleFilter("author")}
          />
          <BooksCategoryDropdown
            booksCategoriesData={bookCategories}
            handleSearch={handleFilterByCategories}
          />
        </div>
        <div>
          <Button onClick={handleOpenNewBookModal("newBookModal", true)}>
            Ավելացնել Նոր Գիրք
          </Button>
          <Button onClick={handleOpenNewBookModal("newCategoryModal", true)}>
            ավելացնել Նոր Կատեգորիա
          </Button>
        </div>
      </div>
      {modals.newBookModal && (
        <AdminAddNewBookModal
          modalOpened={modals.newBookModal}
          onClose={handleOpenNewBookModal}
        />
      )}
      {modals.newCategoryModal && (
        <AdminAddNewCategoryModal
          opened={modals.newCategoryModal}
          onClose={handleOpenNewBookModal}
        />
      )}
    </>
  );
}
