import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import GroupsListDropdown from "components/groupsListDropdown";
import AdminController from "controllers/admin";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { reservationsListSelector } from "store/selectors/app";

const reservationsAPIS = {
  all: AdminController.getNewReservations,
  endingSoon: AdminController.getEndingSoonReservations,
};

export default function AdminReservationsFilters({
  setReservations,
  setLoading,
}) {
  const reservations = useSelector(reservationsListSelector, shallowEqual).data;
  const handleChange = async (e) => {
    setLoading(true);
    const newData = await reservationsAPIS[e.target.value]();
    setReservations(newData.data);
    setLoading(false);
  };

  const handleFilter = (id, parentId) => (e) => {
    setReservations(
      reservations.filter((item) =>
        `${item[parentId][id]}`
          .toUpperCase()
          .includes(`${e.target.value}`.toUpperCase())
      )
    );
  };

  return (
    <div className="header-filters">
      <GroupsListDropdown handleChange={handleFilter} />
      <Box sx={{ width: "13rem" }}>
        <FormControl fullWidth>
          <InputLabel>Փնտրել</InputLabel>
          <Select onChange={handleChange} defaultValue="all">
            <MenuItem value={"endingSoon"}>Շուտով Ավարտվող Հայտեր</MenuItem>
            <MenuItem value={"all"}>Ամբողջը</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
