import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AppController from "controllers/app";
import React, { useEffect, useState } from "react";

export default function GroupsListDropdown({ handleChange }) {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    AppController.getGroups().then((res) => setGroups(res.data));
  }, []);
  return (
    <Box sx={{ width: "13rem" }}>
      <FormControl fullWidth className="select">
        <InputLabel className="select-label" id="demo-simple-select-label">
          Խմբի համար
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Group Number"
          onChange={handleChange("groupNumber", "user")}
          defaultChecked="all"
        >
          <MenuItem value="all">Բոլորը</MenuItem>
          {groups?.map((elem, index) => (
            <MenuItem key={index} value={elem.number}>
              {elem.number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
