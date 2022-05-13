import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function BooksCategoryDropdown({
  handleSearch,
  booksCategoriesData,
}) {
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-label">
          Փնտրել Գրքի Կատեգորիայով
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleSearch}
          label="Age"
        >
          {booksCategoriesData?.map((elem) => (
            <MenuItem value={elem.id}>{elem.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
