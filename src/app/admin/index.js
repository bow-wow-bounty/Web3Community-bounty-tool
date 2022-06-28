import { useCallback, useEffect, useState } from "react";

import Api from "../../api/instances/core";
import Roles from "./components/roles";

const Admin = () => {
  const [roles, setRoles] = useState(null);

  const loadData = useCallback(
    () =>
      Api.get(`/admin/roles`).then((data) => {
        setRoles(data);
      }),
    []
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return !roles ? null : (
    <div className="min-h-full-page container mx-auto space-y-8 py-8">
      <Roles roles={roles} refresh={loadData} />
    </div>
  );
};

export default Admin;
