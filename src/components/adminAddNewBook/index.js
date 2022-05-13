import { Box, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import BooksCategoryDropdown from "components/booksCategoryDropdown";
import AdminController from "controllers/admin";
import UserController from "controllers/user";
import { ADMIN_CREATE_NEW_BOOK_LIST_INPUTS } from "helpers/constants";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./style.scss";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowX: 'overlay',
  height: '400px',
};

export default function AdminAddNewBookModal({ modalOpened, onClose }) {
  const [booksCategoriesData, setBooksCategoriesData] = useState([]);
  const [newBookData, setNewBookData] = useState({
    name: "",
    author: "",
    productionYear: 1900,
    description: "",
    pagesCount: "",
    quantity: "",
    availableForBorrowingCount: "",
    availableForUsingInLibraryCount: "",
  });
  const handleInputsChange = (id) => (e) => {
    setNewBookData({ ...newBookData, [id]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await AdminController.CreateNewBook({
      ...newBookData,
      overrideExistingValues: true,
    });
    if (response) {
      handleClose();
      toast.success("Success");
    }
  };

  useEffect(() => {
    UserController.getBookCategories().then((res) =>
      setBooksCategoriesData(res)
    );
  }, []);

  const handleSelectCategory = (e) => {
    setNewBookData({ ...newBookData, categoryId: e.target.value });
  };

  const handleClose = () => {
    return onClose("newBookModal", false)();
  };

  return (
    <Modal open={modalOpened}>
      <Box sx={style}>
        <div className="create-new-book-list">
          {ADMIN_CREATE_NEW_BOOK_LIST_INPUTS.map(
            ({ type, title, id }, index) => (
              <div className="new-book-data" key={index}>
                <label className="input-type-label" htmlFor={id}>
                  {title}
                </label>
                <TextField
                  id={id}
                  type={type || "text"}
                  label={title}
                  placeholder={title}
                  className="input-change"
                  onChange={handleInputsChange(id)}
                  value={newBookData[id]}
                />
              </div>
            )
          )}
          <BooksCategoryDropdown
            booksCategoriesData={booksCategoriesData}
            handleSearch={handleSelectCategory}
          />
        </div>

        <div className="modal-buttons">
          <Button onClick={handleClose}>Չեղարկել</Button>
          <Button onClick={handleSubmit}>Հաստատել</Button>
        </div>
      </Box>
    </Modal>
  );
}
