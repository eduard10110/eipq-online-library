import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import AdminController from "controllers/admin";
import { adminBookDeletionReasons } from "helpers/constants";
import React, { useState } from "react";

export default function AdminBookDeleteModal({
  open,
  bookId,
  onClose,
  setLoading,
  getBookList,
}) {
  const [inputsData, setInputsData] = useState({
    count: "",
    deletionReason: "",
    note: "",
  });
  const handleChange = (type) => (e) => {
    setInputsData({ ...inputsData, [type]: e.target.value });
  };

  const handleClose = () => {
    onClose(false, null)();
  };

  const handleSubmit = async () => {
    setLoading(true);
    await AdminController.deleteBookCreationRequest({ ...inputsData, bookId });
    await getBookList();
    setLoading(false);
  };

  return (
    <Modal open={open}>
      <div className="book-delete-modal-container">
        <div className="input-wrapper">
          <label htmlFor="count">Քանակ</label>
          <TextField
            type="number"
            value={inputsData.count}
            onChange={handleChange("count")}
            placeholder="Քանակ"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="deletionReason">Պատճառ</label>
          <FormControl fullWidth>
            <InputLabel>Պատճառ</InputLabel>
            <Select
              value={inputsData.deletionReason}
              id="deletionReason"
              onChange={handleChange("deletionReason")}
            >
              {adminBookDeletionReasons.map((elem) => (
                <MenuItem value={elem}>{elem}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="input-wrapper">
          <label>Նշումներ</label>
          <TextField
            type="text"
            value={inputsData.note}
            onChange={handleChange("note")}
            placeholder="Նշումներ"
          />
        </div>
        <div className="modal-buttons-wrapper">
          <Button onClick={handleClose}>Չեղարկել</Button>
          <Button onClick={handleSubmit}>Հաստատել</Button>
        </div>
      </div>
    </Modal>
  );
}
