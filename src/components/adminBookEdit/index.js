import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import AdminController from "controllers/admin";
import { ADMIN_CREATE_NEW_BOOK_LIST_INPUTS } from "helpers/constants";
import React, { useEffect, useState } from "react";
import "./style.scss";
export default function AdminBookEditModal({
  editableBook,
  isOpened,
  onClose,
}) {
  const [bookData, setBookData] = useState({});
  useEffect(() => {
    setBookData({
      ...editableBook,
      quantity: editableBook.totalCount,
      categoryId: editableBook?.category?.id,
    });
  }, [editableBook]);
  const handleInputsChange = (id) => (e) =>
    setBookData({ ...bookData, [id]: e.target.value });
  const handleSubmit = async () => {
    await AdminController.editBook(bookData);
    onClose(false)();
  };
  return (
    <Modal open={isOpened}>
      <div className="edit-modal-container">
        {ADMIN_CREATE_NEW_BOOK_LIST_INPUTS.map(
          ({ type, title, id, disabled }, index) => (
            <div key={index} className="textfield-column">
              <label htmlFor="id" className="edit-label">{title}</label>
              <TextField
                className="edit-textfield"
                type={type || "text"}
                value={bookData[id]}
                onChange={handleInputsChange(id)}
                disabled={disabled}
              />
            </div>
          )
        )}
        <div className="modal-buttons">
            <Button onClick={onClose(false)}>Չեղարկել</Button>
            <Button onClick={handleSubmit}>Հաստատել</Button>
        </div>
      </div>
    </Modal>
  );
}
