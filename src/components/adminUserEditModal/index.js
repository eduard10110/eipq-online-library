/* eslint-disable react-hooks/exhaustive-deps */
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
import AppController from "controllers/app";
import React, { useEffect, useState } from "react";

export default function AdminUserEditModal({
  open,
  data,
  onClose,
  setLoading,
  getUsersList,
}) {
  const [userData, setUserData] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setLoading(true);
    AppController.getGroups()
      .then((res) => setGroups(res.data))
      .finally(() => setLoading(false));
    setUserData(data);
  }, [data]);

  const handleClose = () => {
    onClose(false, null)();
  };
  const handleSubmit = async () => {
    setLoading(true);
    const response = await AdminController.upDateUser(userData);
    if (response) {
      await getUsersList();
      handleClose();
    }
    setLoading(false);
  };

  const handleChange = (type) => (e) => {
    setUserData({ ...userData, [type]: e.target.value });
  };
  return (
    <Modal open={open}>
      <div className="modal-wrapper">
        <div className="inputs-wrapper">
          <div className="input-item">
            <label htmlFor="firstname">Անուն</label>
            <TextField
              id={"firstname"}
              placeholder="Անուն"
              value={userData?.firstname}
              onChange={handleChange("firstname")}
            />
          </div>
          <div className="input-item">
            <label htmlFor="Ազգանուն">Ազգանուն</label>
            <TextField
              id={"Ազգանուն"}
              placeholder="Ազգանուն"
              value={userData?.lastname}
              onChange={handleChange("lastname")}
            />
          </div>
          {/* <div className="input-item">
            <label htmlFor="Էլ. Փոստ">Էլ. Փոստ</label>
            <TextField
              id={"Էլ. Փոստ"}
              placeholder="Էլ. Փոստ"
              value={userData?.email}
              onChange={handleChange("email")}
            />
          </div> */}
          <div className="input-item">
            <label htmlFor="Ոսանողական Տոմսի Համար">
              Ոսանողական Տոմսի Համար
            </label>
            <TextField
              id={"Ոսանողական Տոմսի Համար"}
              placeholder="Ոսանողական Տոմսի Համար"
              value={userData?.studentCardNumber}
              onChange={handleChange("studentCardNumber")}
            />
          </div>
          <div className="input-item">
            <label htmlFor="groupNumber">Խմբի համար</label>
            <FormControl fullWidth className="select">
              <InputLabel
                className="select-label"
                id="demo-simple-select-label"
              >
                Խմբի համար
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="groupNumber"
                label="Group Number"
                onChange={handleChange("groupNumber")}
                defaultChecked="all"
                value={userData?.groupNumber}
              >
                {groups?.map((elem, index) => (
                  <MenuItem key={index} value={elem.number}>
                    {elem.number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="modal-buttons-wrapper">
          <Button onClick={handleClose}>Չեղարկել</Button>
          <Button onClick={handleSubmit}>Հաստատել</Button>
        </div>
      </div>
    </Modal>
  );
}
