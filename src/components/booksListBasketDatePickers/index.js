import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

export default function BooksListBasketDatePickers({
  state,
  setState,
  bookId,
}) {
  const handleChange = (id) => (date) => {
    setState({ ...state, [bookId]: { ...state[bookId], [id]: date } });
  };
  return (
    <div className="datePickers-wrapper">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={state[bookId]?.borrowingDate}
          renderInput={(props) => <TextField {...props} />}
          label="Վերցնելու օր"
          onChange={handleChange("borrowingDate")}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={state[bookId]?.returnDate}
          renderInput={(props) => <TextField {...props} />}
          label="հանձնելու օր"
          onChange={handleChange("returnDate")}
        />
      </LocalizationProvider>
    </div>
  );
}
