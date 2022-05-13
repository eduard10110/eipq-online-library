import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AppController from "controllers/app";
import SignInController from "controllers/signIn";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Armenia from "../../../image/flag.jpg";
import "./style.scss";

const EMAIL_REGEX =
  "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])";
const PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const PHONE_REGEX = /^[0-9]{8}$/;

export function Register() {
  const [groupsDropdownData, setGroupsDropdownData] = useState([]);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    studentCardOrPassportNumber: "",
    groupNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    password: false,
    email: false,
    confirmPassword: false,
    phoneNumber: false,
  });

  const [missingValues, setMissingValues] = useState({});

  const {
    firstName,
    lastName,
    studentCardOrPassportNumber,
    groupNumber,
    email,
    password,
    confirmPassword,
    phoneNumber,
  } = userInfo;

  const isTeacher = userInfo.groupNumber === "Դասախոս";

  useEffect(() => {
    getGroups().then((res) => {
      setGroupsDropdownData(res.data);
    });
  }, []);

  const getGroups = async () => {
    return await AppController.getGroups();
  };

  const handleChange = (type) => (e) => {
    setUserInfo({ ...userInfo, [type]: e.target.value });
    setErrors({
      ...errors,
      [type]: !RegExp(e.target.dataset?.pattern).test(e.target.value),
    });
    setMissingValues({ ...missingValues, [type]: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, confirmPassword, email, phoneNumber } = userInfo;
    const missingValues = Object.fromEntries(
      Object.entries(userInfo)
        .filter(([_, val]) => !val)
        .map(([_, val]) => [_, !val])
    );
    const newErrors = {
      ...errors,
      password: !!password && !PASS_REGEX.test(password),
      confirmPassword: !!confirmPassword && confirmPassword !== password,
      email: !!email && !RegExp(EMAIL_REGEX).test(email),
      phoneNumber: !!phoneNumber && !PHONE_REGEX.test(phoneNumber),
    };
    setMissingValues(missingValues);
    setErrors(newErrors);

    if (
      Object.values({ ...newErrors, ...missingValues }).filter(Boolean).length
    )
      return;

    const userExists = await AppController.getUserRole(userInfo.email);
    if (userExists.userExists) {
      return toast.error("The User Already Exists");
    }
    const { studentCardOrPassportNumber, ...payload } = userInfo;
    const keyForNumber = isTeacher ? "passportNumber" : "studentCardNumber";
    await SignInController.register({
      ...payload,
      [keyForNumber]: studentCardOrPassportNumber,
    });
  };
  return (
    <div className="base_container">
      <nav>
        <Link to="/">ԵԻՊՔ ԳՐԱԴԱՐԱՆ</Link>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className="header">Գրանցում</div>
        <div className="content">
          <div className="form">
            <div className="flex">
              <div className="formgroup">
                <label className="label" htmlFor="name">
                  Անուն
                </label>
                <input
                  className={`input ${
                    errors.firstName || missingValues.firstName
                      ? "input-error"
                      : ""
                  }`}
                  value={firstName}
                  onChange={handleChange("firstName")}
                  type="text"
                  name="username"
                  data-pattern="^[\u0530-\u058F]*$"
                  autoComplete="off"
                />
                {errors.firstName && (
                  <div className="error-message">
                    Անունը պետք է լինի հայատառ
                  </div>
                )}
                {missingValues.firstName && (
                  <div className="error-message">
                    Անունի դաշտը լրացնելը պարտադիր է
                  </div>
                )}
              </div>
              <div className="formgroup">
                <label className="label" htmlFor="lastname">
                  Ազգանուն
                </label>
                <input
                  className={`input ${
                    errors.lastName || missingValues.lastName
                      ? "input-error"
                      : ""
                  }`}
                  value={lastName}
                  onChange={handleChange("lastName")}
                  type="text"
                  name="username"
                  data-pattern="^[\u0530-\u058F]*$"
                  autoComplete="off"
                />
                {errors.lastName && (
                  <div className="error-message">
                    Ազգանունը պետք է լինի հայատառ
                  </div>
                )}
                {missingValues.lastName && (
                  <div className="error-message">
                    Ազգանուն դաշտը լրացնելը պարտադիր է
                  </div>
                )}
              </div>
            </div>
            <div className="formgroup">
              <FormControl className="select" size="small">
                <InputLabel
                  className="select-label"
                  id="demo-simple-select-label"
                >
                  Խմբի համար
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={groupNumber}
                  label="Group Number"
                  onChange={handleChange("groupNumber")}
                  error={!!missingValues.groupNumber}
                >
                  {groupsDropdownData?.map((elem, index) => (
                    <MenuItem key={index} value={elem.number}>
                      {" "}
                      {elem.number}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {missingValues.groupNumber && (
                <div className="error-message">
                  Խմբի համար դաշտը լրացնելը պարտադիր է
                </div>
              )}
            </div>

            <div className="flex">
              <div className="formgroup">
                <label className="label" htmlFor="studentCardOrPassportNumber">
                  {isTeacher ? "Անձնագրի համար" : "Ուսանողական տոմսի համար"}
                </label>
                <input
                  className={`input ${
                    missingValues.studentCardOrPassportNumber
                      ? "input-error"
                      : ""
                  }`}
                  value={studentCardOrPassportNumber}
                  onChange={handleChange("studentCardOrPassportNumber")}
                  type="text"
                  name="username"
                  placeholder={
                    isTeacher ? "Օրինակ`  AM0502565" : "Օրինակ`  Դ-128"
                  }
                  autoComplete="off"
                />
                {missingValues.studentCardOrPassportNumber && (
                  <div className="error-message">{`${
                    isTeacher ? "Անձնագրի համար" : "Ուսանողական տոմս"
                  } դաշտը լրացնելը պարտադիր է`}</div>
                )}
              </div>

              <div className="formgroup">
                <label className="label" htmlFor="email">
                  Էլ․հասցե
                </label>
                <input
                  className={`input ${
                    errors.email || missingValues.email ? "input-error" : ""
                  }`}
                  value={email}
                  onChange={handleChange("email")}
                  type="text"
                  name="username"
                  placeholder="example@gmail.com"
                  autoComplete="off"
                />
                {missingValues.email && (
                  <div className="error-message">
                    Էլ․հասցե դաշտը լրացնելը պարտադիր է
                  </div>
                )}
                {errors.email && (
                  <div className="error-message">Սխալ Էլ․ հասցե</div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="formgroup">
                <label className="label" htmlFor="password">
                  Գաղտնաբառ
                </label>
                <input
                  className={`input ${
                    errors.password || missingValues.password
                      ? "input-error"
                      : ""
                  }`}
                  value={password}
                  onChange={handleChange("password")}
                  type="password"
                  name="password"
                  placeholder="Գաղտնաբառ"
                  autoComplete="off"
                />
                {missingValues.password && (
                  <div className="error-message">
                    Գաղտնաբառ դաշտը լրացնելը պարտադիր է
                  </div>
                )}
                {errors.password && (
                  <div className="error-message">
                    Գաղտնաբառը պետք է պարունակի առնվազն 6 նիշ, ունենա մեկ
                    մեծատառ, մեկ փոքրատառ, մեկ թիվ, մեկ թվանշան
                  </div>
                )}
              </div>
              <div className="formgroup">
                <label className="label" htmlFor="confirmpassword">
                  Հաստատում
                </label>
                <input
                  className={`input ${
                    errors.confirmPassword || missingValues.confirmPassword
                      ? "input-error"
                      : ""
                  }`}
                  value={confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  type="password"
                  name="confirmpassword"
                  placeholder="Կրկնի՛ր գաղտնաբառը"
                  autoComplete="off"
                />
                {missingValues.confirmPassword && (
                  <div className="error-message">
                    Գաղտնաբառի հաստատում դաշտը լրացնելը պարտադիր է
                  </div>
                )}
                {errors.confirmPassword && (
                  <div className="error-message">
                    Գաղտնաբառերը չեն համընկնում
                  </div>
                )}
              </div>
            </div>
            <div className="formgroup">
              <label className="label phone-label" htmlFor="phone">
                Հեռախոսահամար
              </label>
              <div className="phone-group">
                <label htmlFor="area_code" className="phonecode">
                  <img className="flag" src={Armenia} alt="Img" />
                </label>
                <input
                  className={`phone ${
                    errors.phoneNumber || missingValues.phoneNumber
                      ? "input-error"
                      : ""
                  }`}
                  value={phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  type="number"
                  placeholder="+374 00 000 000"
                  name="phoneNumber"
                  autoComplete="off"
                />
              </div>
              {missingValues.phoneNumber && (
                <div className="error-message">
                  Հեռախոսահամարի հաստատում դաշտը լրացնելը պարտադիր է
                </div>
              )}
              {errors.phoneNumber && (
                <div className="error-message">Սխալ հեռախոսահամար</div>
              )}
            </div>
            <Link to="/login" className="loginlink">
              Մուտք գործել
            </Link>
          </div>
        </div>
        <div className="footer">
          <button className="submit-button" type="submit">
            Ուղարկել հայտը
          </button>
        </div>
      </form>
    </div>
  );
}
