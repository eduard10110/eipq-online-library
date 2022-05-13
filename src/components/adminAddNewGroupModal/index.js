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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Loading from "components/loading";
import AdminController from "controllers/admin";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "20rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminAddNewGroupModal({ open, onCLose }) {
  const [loading, setLoading] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [newGroup, setNewGroup] = useState({
    number: "",
    creationDate: "",
    graduationDate: "",
    professionId: "",
  });

  useEffect(() => {
    setLoading(true);
    getProfessions();
    setLoading(false);
  }, []);

  const getProfessions = async () => {
    const response = await AdminController.getProfessions();
    setProfessions(response);
  };

  const handleClose = () => {
    onCLose("addNewGroup", false)();
  };

  const handleChange = (id) => (e) => {
    const value = e.target?.value ? e.target.value : e;
    setNewGroup({ ...newGroup, [id]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await AdminController.addNewGroup(newGroup);
    handleClose();
    handleClose();
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}
      <Modal open={open}>
        <Box sx={style}>
          <div className="modal-column-input">
            <label htmlFor="groupNumber" >Խմբի համար</label>
            <TextField
              id="groupNumber"
              type="number"
              value={newGroup.number}
              onChange={handleChange("number")}
              label="Խմբի Համար"
            />
          </div>
          <div className="modal-column-input">

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                renderInput={(props) => <TextField {...props} />}
                label="Ստեղծման Ամսաթիվ"
                value={newGroup.creationDate}
                onChange={handleChange("creationDate")}
              />
            </LocalizationProvider>
          
          </div>
          <div className="modal-column-input">

          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                renderInput={(props) => <TextField {...props} />}
                label="Ավարտման Ամսաթիվ"
                value={newGroup.graduationDate}
                onChange={handleChange("graduationDate")}
              />
            </LocalizationProvider>
            </div>
          <div className="modal-column-input">

            <FormControl fullWidth className="select">
              <InputLabel
                className="select-label"
                id="demo-simple-select-label"
              >
                մասնագիտություն
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newGroup.professionId}
                label="Group Number"
                onChange={handleChange("professionId")}
              >
                {professions?.map((elem, index) => (
                  <MenuItem key={index} value={elem.id}>
                    {elem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="modal-buttons-wrapper">
            <Button onClick={handleClose}>Չեղարկել</Button>
            <Button onClick={handleSubmit}>Հաստատել</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
