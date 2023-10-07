import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import AdminPage from "../pages/AdminPage";
import RequireRole from "./RequiredRole";
import RegisterPage from "../pages/RegisterPage";

type Props = {
  role: string;
};

const ProtectedRoutes = (props: Props) => {
  return (
    <Routes>
      <Route
        element={
          <RequireRole allowedRoles={["admin", "user"]} role={props.role} />
        }
      >
        <Route path="/main" element={<MainPage />} />
      </Route>
      <Route
        element={<RequireRole allowedRoles={["admin"]} role={props.role} />}
      >
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route
        element={<RequireRole allowedRoles={["admin"]} role={props.role} />}
      >
        <Route path="/admin/addUser" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes;
