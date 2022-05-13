import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import ChangePasswordModal from "components/changePasswordModal";
import SignInController from "controllers/signIn";
import UserController from "controllers/user";
import { USER_TYPES } from "helpers/constants";
import useNavigationWithQueryParams from "helpers/hooks/useNavigationWithQueryParams";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import routes from "routes/routes";
import { userPersonalInfoSelector } from "store/selectors/userInfo";
import "./index.scss";

const UserSelect = ({ setLoading }) => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const { displayName, role } = useSelector(userPersonalInfoSelector);
  const navigate = useNavigationWithQueryParams();

  const handleLogOut = async () => {
    setLoading(true);
    const res =
      role === USER_TYPES.student
        ? await UserController.logOut()
        : await SignInController.adminLogOut();
    if (res?.hasError) return toast.error(res.errorMessage);
    navigate(routes.home);
    setLoading(false);
  };

  const handleChangePassword = (payload) => () => {
    setChangePasswordModal(payload);
  };

  return (
    <>
      <ChangePasswordModal
        open={changePasswordModal}
        onClose={handleChangePassword}
      />
      <Box sx={{ minWidth: "12rem" }} className="user-select-box">
        <FormControl fullWidth>
          <InputLabel>{displayName}</InputLabel>
          <Select variant="standard">
            <MenuItem onClick={handleLogOut} className="menuitem">
              դուրս գալ
            </MenuItem>
            <MenuItem onClick={handleChangePassword(true)} className="menuitem">
              Փոխել Գաղտնաբառը
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
export default UserSelect;
