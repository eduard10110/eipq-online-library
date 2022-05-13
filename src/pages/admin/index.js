import AdminHeader from "containers/adminHeader";
import { adminHeaderData } from "helpers/constants";
import { useState } from "react";

export default function Admin() {
  const [tabValue, setTabValue] = useState(adminHeaderData[0]);
  return (
    <div>
      <AdminHeader tabValue={tabValue} setTabValue={setTabValue} />
      <tabValue.Comp />
    </div>
  );
}
