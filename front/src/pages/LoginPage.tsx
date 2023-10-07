import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
import { HiOutlineFolder } from "react-icons/hi";
import { login as handleLogin } from "./requests/requests";
import { useNavigate } from "react-router-dom";
import LoginSideImg from "../assets/LoginSideImg.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.email === "" || credentials.password === "") {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    try {
      const response = await handleLogin(credentials);
      dispatch(login(response.data));
      toast.success("Vous êtes connecté");
      navigate("/main");
    } catch (error) {
      toast.error("Erreur lors de la connexion");
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="flex items-center justify-center flex-1">
        <img src={LoginSideImg} alt="LoginSideImg" height={780} width={780} />
      </div>
      <div className="flex items-center justify-center flex-1 ">
        <div className="w-1/2 p-6 transition-opacity border rounded-lg shadow-2xl bg-gradient-to-l from-blue-900 to-cyan-600 opacity-80 hover:opacity-100">
          <div className="flex items-center justify-center my-4">
            <HiOutlineFolder className="text-6xl text-white drop-shadow-lg" />
          </div>
          <form className="w-full " onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white "
              >
                Votre email
              </label>
              <input
                type="text"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                placeholder="nom@exemple.com"
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white "
              >
                Votre mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                onChange={handleChange}
                name="password"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
