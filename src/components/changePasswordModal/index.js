import { Button, Modal, TextField } from "@mui/material";
import Loading from "components/loading";
import AdminController from "controllers/admin";
import UserController from "controllers/user";
import { USER_TYPES } from "helpers/constants/index";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { userPersonalInfoSelector } from "store/selectors/userInfo";

export default function ChangePasswordModal({ open, onClose }) {
  const { role } = useSelector(userPersonalInfoSelector, shallowEqual);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    email: "",
  });
  const handleClose = () => {
    onClose(false)();
  };

  const handleChange = (type) => (e) => {
    setData({ ...data, [type]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response =
      role === USER_TYPES.student
        ? UserController.changePassword(data).finally(() => setLoading(false))
        : AdminController.changePassword(data).finally(() => setLoading(false));
    response && handleClose();
  };

  const { password, newPassword, confirmNewPassword } = data;
  return (
    <>
      {loading && <Loading />}
      <Modal open={open}>
        <div className="change-password-modal">
          <div className="admin-change-password-modal-inner">
            <div className="form-item">
              <label htmlFor="password">Գաղտնաբառ</label>
              <TextField
                id="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <div className="form-item">
              <label htmlFor="newPassword">Նոր Գաղտնաբառ</label>
              <TextField
                id="newPassword"
                value={newPassword}
                onChange={handleChange("newPassword")}
              />
            </div>
            <div className="form-item">
              <label htmlFor="confirmNewPassword">Կրկնեք Գաղտնաբառը</label>
              <TextField
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleChange("confirmNewPassword")}
              />
            </div>
          </div>
          <div className="modal-buttons-wrapper">
            <Button onClick={handleClose}>Չեղարկել</Button>
            <Button onClick={handleSubmit}>Հաստատել</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
