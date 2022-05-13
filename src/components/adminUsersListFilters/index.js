import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import GroupsListDropdown from "components/groupsListDropdown";
import React from "react";

export default function AdminUsersListFilters({
  handleFilterFieldChange,
  handleFilterByStatus,
}) {
  return (
    <div style={{ display: "flex" }}>
      <TextField
        label="Փնտրել Օգտատերի Անունով"
        onChange={handleFilterFieldChange("firstname")}
      />
      <TextField
        label="Փնտրել Օգտատերի Ազգանունով"
        onChange={handleFilterFieldChange("lastname")}
      />
      <GroupsListDropdown handleChange={handleFilterFieldChange} />
      <Box sx={{ width: "13rem" }}>
        <FormControl fullWidth>
          <InputLabel>Փնտրել Օգտատերի Կարգավիճակով</InputLabel>
          <Select onChange={handleFilterByStatus}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
