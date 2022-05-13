import { TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { groupsListSelector } from "store/selectors/app";

export default function AdminGroupsArchiveTableHeaderActions({
  setGroupsList,
}) {
  const groupsList = useSelector(groupsListSelector);

  const handleFilter = (type) => (e) => {
    setGroupsList(
      groupsList.filter((elem) =>
        `${elem[type]}`.toUpperCase().startsWith(`${e.target.value}`)
      )
    );
  };

  const handleFilterByProfession = (e) => {};

  return (
    <div className="header-actions-container-wrapper">
      <TextField label="Խմբի Համարով" onChange={handleFilter("number")} />
      <TextField
        label="Խմբի Ստեղծման Տարեթվով"
        onChange={handleFilter("creationYear")}
      />
      <TextField label="Մասնագիտությամբ" onChange={handleFilterByProfession} />
    </div>
  );
}
