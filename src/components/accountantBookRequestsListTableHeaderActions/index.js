import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

export default function AccountantBookRequestsListTableHeaderActions({
  setBookCreationRequests,
  bookCreationRequests,
}) {
  const handleChange = (id) => (e) => {
    e.target.value !== "all"
      ? setBookCreationRequests(
          bookCreationRequests.filter((elem) =>
            elem[id].toUpperCase().includes(e.target.value.toUpperCase())
          )
        )
      : setBookCreationRequests(bookCreationRequests);
  };
  return (
    <div className="table-modal-header-actions">
      <div className="header-filters">
        <TextField
          onChange={handleChange("name")}
          label="Փնտրել Գրքի Անունով"
        />
        <TextField
          onChange={handleChange("author")}
          label="Փնտրել Գրքի Հեղինակով"
        />
        <Box sx={{ width: "13rem" }}>
          <FormControl fullWidth>
            <InputLabel>Փնտրել Կարգավւճակով</InputLabel>
            <Select onChange={handleChange("requestStatus")} defaultValue="all">
              <MenuItem value="all">Բոլորը</MenuItem>
              <MenuItem value="Approved">Հաստատված է</MenuItem>
              <MenuItem value="Pending">Սպասվում է</MenuItem>
              <MenuItem value="Rejected">Մերժված է</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div></div>
    </div>
  );
}
