import { Button, Modal, TextField } from "@mui/material";
import AdminController from "controllers/admin";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AdminAddNewCategoryModal({ opened, onClose }) {
  const [name, setName] = useState("");
  const handleClose = () => {
    return onClose("newCategoryModal", false)();
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async () => {
    if (name.length > 0) {
      const response = await AdminController.createNewCategory({ name });
      if (response) {
        toast.success("Success");
        return handleClose();
      }
    } else {
      toast.error("Please Fill All Fields");
    }
  };
  return (
    <Modal open={opened}>
      <div className="edit-modal-container  category-modal-wrapper">
        <h3>Ավելացնել Նոր Կատեգորիա</h3>
        <div className="category">
          <label htmlFor="name">Կատեգորիայի անունը</label>
          <TextField id="name" value={name} onChange={handleChange} />
        </div>
        <div className="modal-buttons">
          <Button onClick={handleClose}>Չեղարկել</Button>
          <Button onClick={handleSubmit}>Հաստատել</Button>
        </div>
      </div>
    </Modal>
  );
}
