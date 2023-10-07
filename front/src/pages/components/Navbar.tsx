import { HiOutlineFolder, HiUsers } from "react-icons/hi";
import { logout } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Auth } from "../../redux/models/models";

const Navbar = () => {
  const role = useSelector((state: Auth) => state.user.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
  };

  const handleReturn = () => {
    navigate(-1);
  };

  const handleNavigateAdmin = () => {
    navigate("/admin");
  };

  return (
    <nav className="sticky top-0 bg-white border-gray-200 shadow-lg bg-gradient-to-l from-blue-900 to-cyan-600">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <BiLeftArrowAlt
          className="text-4xl text-white drop-shadow-lg hover:scale-125 hover:cursor-pointer"
          onClick={handleReturn}
        />
        <a href="/" className="flex items-center">
          <HiOutlineFolder className="text-4xl text-white drop-shadow-lg" />
          <span className="self-center text-2xl font-semibold text-white whitespace-nowrap">
            ArcGis Workforce
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="flex flex-row items-center justify-center gap-6">
          {role === "admin" && (
            <HiUsers
              className="text-4xl text-white drop-shadow-lg hover:scale-110 hover:cursor-pointer"
              onClick={handleNavigateAdmin}
            />
          )}
          <button
            className="p-3 font-semibold text-white bg-red-600 rounded hover:scale-105"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
