import React, { useState } from "react";
import { HiOutlineFolder } from "react-icons/hi";
import Navbar from "./components/Navbar";
import { register } from "./requests/requests";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      credentials.firstname === "" ||
      credentials.lastname === "" ||
      credentials.email === "" ||
      credentials.password === "" ||
      credentials.confirmPassword === ""
    ) {
      toast.error("Veuillez remplir tous les champs");
      return;
    } else if (credentials.password !== credentials.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await register({
        firstname: credentials.firstname,
        lastname: credentials.lastname,
        email: credentials.email,
        password: credentials.password,
      });
      toast.success("Utilisateur bien inscrit");
    } catch (error) {
      toast.error("Erreur lors de l'inscription");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-row h-screen">
        <div className="flex items-center justify-center flex-1 ">
          <div className="w-1/2 p-6 transition-opacity border rounded-lg shadow-2xl bg-gradient-to-l from-blue-900 to-cyan-600 opacity-80 hover:opacity-100">
            <div className="flex items-center justify-center my-4">
              <HiOutlineFolder className="text-6xl text-white drop-shadow-lg" />
            </div>
            <form className="w-full " onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Votre prénom
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  placeholder="John"
                  onChange={handleChange}
                  name="firstname"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Votre nom
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  placeholder="Doe"
                  onChange={handleChange}
                  name="lastname"
                />
              </div>
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
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Confirmer mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  onChange={handleChange}
                  name="confirmPassword"
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
