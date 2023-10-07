import { useState } from "react";
import { HiOutlineFolder } from "react-icons/hi";
import { toast } from "react-toastify";
import { User } from "../../redux/models/models";

type Props = {
  firstname: string;
  lastname: string;
  email: string;
  hidden?: string;
  handleHide: () => void;
  handleUpdate: (user: User) => void;
};
const UserEditCard = (props: Props) => {
  const [user, setUser] = useState(props);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.firstname === "" || user.lastname === "" || user.email === "") {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    try {
      await props.handleUpdate(user);
      props.handleHide();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'utilisateur");
    }
  };
  return (
    <div
      className={`flex items-center justify-center flex-1 Modal ${props.hidden} fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity`}
      id="internshipModal"
      tabIndex={-1}
      role="dialog"
    >
      <div className="w-1/2 p-6 transition-opacity border rounded-lg shadow-2xl bg-gradient-to-l from-blue-900 to-cyan-600 opacity-80 hover:opacity-100">
        <div className="relative w-full p-4 bg-white border rounded shadow-lg modal-content ">
          <div className="mb-5 text-2xl font-bold text-center text-blue-800 modal-title">
            Modifier utilisateur
          </div>
          <button
            className="absolute top-0 right-0 p-2 text-2xl font-bold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
            onClick={props.handleHide}
          >
            <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-50">
              ×
            </span>
          </button>
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
                defaultValue={props.firstname}
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
                defaultValue={props.lastname}
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
                defaultValue={props.email}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Modifier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditCard;
