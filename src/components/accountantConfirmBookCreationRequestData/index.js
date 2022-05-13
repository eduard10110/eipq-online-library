import { Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";

export default function AccountantConfirmBookCreationRequestData({
  open,
  onClose,
  handleSubmit,
}) {
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleClose = () => {
    onClose({ open: false, requestId: null })();
  };
  return (
    <Modal open={open}>
      <div className="modal-container-wrapper">
        <div className="modal-header">
          <h5>Թողեք Ձեր Մեկնաբանությունը</h5>
        </div>
        <div className="modal-inner">
          <div>
            <label htmlFor="comment">Մեկնաբանություն</label>
            <TextField
              onChange={handleChange}
              value={comment}
              label="Մեկնաբանություն"
              id="comment"
            />
          </div>
        </div>
        <div className="modal-buttons">
          <Button onClick={handleClose}>Չեղարկել</Button>
          <Button onClick={handleSubmit(comment)}>Հաստատել</Button>
        </div>
      </div>
    </Modal>
  );
}
