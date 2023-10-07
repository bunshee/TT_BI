import { Outlet } from "react-router-dom";
import Unauthorized from "../pages/UnauthorizedPage";

type Props = {
  allowedRoles: string[];
  role: string;
};

const RequireRole = (props: Props) => {
  return (
    <>
      {props.allowedRoles.includes(props.role) && props.allowedRoles ? (
        <Outlet />
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default RequireRole;
