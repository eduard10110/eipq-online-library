import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import AdminController from "controllers/admin";
import { SUPER_ADMIN_ADD_NEW_ADMIN } from "helpers/constants";
import React, { useState } from "react";

export default function AddNewAdminModal({ open, onClose, setLoading }) {
  const [inputsData, setInputsData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
  });
  const handleClose = async () => {
    onClose(false)();
  };

  const handleChange = (id) => (e) => {
    setInputsData({ ...inputsData, [id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await AdminController.createNewAdmin(inputsData);
    handleClose();
    setLoading(false);
  };
  return (
    <Modal open={open}>
      <div className="add-new-admin-modal">
        <div className="modal-header">
          <h4>Ավելացնել Նոր Ադմին</h4>
        </div>
        <div className="modal-inner">
          {SUPER_ADMIN_ADD_NEW_ADMIN.map(({ type, title, id }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
              }}
            >
              <label htmlFor={id}>{title}</label>
              <TextField
                id={id}
                type={type || "text"}
                label={title}
                value={inputsData[id]}
                onChange={handleChange(id)}
              />
            </div>
          ))}
          <Box
            sx={{
              width: "25rem",
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Պաշտոն</InputLabel>
              <Select
                value={inputsData.occupation}
                onChange={handleChange("occupation")}
                id="occupation"
              >
                <MenuItem value="SuperAdmin">Սուպեր Ադմին</MenuItem>
                <MenuItem value="Librarian">Գրադարանավար</MenuItem>
                <MenuItem value="Accountant">հաշվապահ</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="modal-buttons">
          <Button onClick={handleClose}>Չեղարկել</Button>
          <Button onClick={handleSubmit}>Հաստատել</Button>
        </div>
      </div>
    </Modal>
  );
}
