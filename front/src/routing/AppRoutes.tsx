import LandingPage from "../pages/LandingPage";
import App from "../App";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Login from "../pages/LoginPage";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Auth } from "../redux/models/models";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  const AuthUser = useSelector((state: Auth) => state);
  return (
    <Router>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<LandingPage />} />
          {AuthUser.user.role !== "" ? (
            <>
              <Route
                path="/*"
                element={<ProtectedRoutes role={AuthUser.user.role} />}
              />
              <Route path="/login" element={<Navigate to="/main" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
};

export { AppRoutes };
