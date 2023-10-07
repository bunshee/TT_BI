import { BiPlus } from "react-icons/bi";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers, updateUser } from "./requests/requests";
import { useEffect, useState } from "react";
import { User } from "../redux/models/models";
import UserCard from "./components/UserCard";
import { toast } from "react-toastify";
import UserEditCard from "./components/UserEditCard";

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [hidden, setHidden] = useState<string>("hidden");
  const navigate = useNavigate();
  const handleAddUser = () => {
    navigate("/admin/addUser");
  };

  const handleHide = () => {
    setHidden("hidden");
  };

  const handleShow = () => {
    setHidden("");
  };

  const handleDelete = async (email: string) => {
    try {
      await deleteUser(email);
      setUsers(users.filter((user) => user.email !== email));
      toast.success("Utilisateur supprimé");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la suppression de l'utilisateur");
    }
  };

  const handleUpdate = async (user: User) => {
    try {
      await updateUser(user);
      setUsers(
        users.map((u) => {
          if (u.email === user.email) {
            return user;
          }
          return u;
        })
      );
      toast.success("Utilisateur mis à jour");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  useEffect(() => {
    try {
      getUsers().then((res) => {
        setUsers(res.data);
      });
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des utilisateurs");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-end justify-end w-full px-2 mt-2">
        <div
          className="flex flex-row items-center justify-center text-white rounded-full bg-cyan-800 hover:cursor-pointer"
          onClick={handleAddUser}
        >
          <div className="p-2 m-2 bg-white border-2 rounded-full shadow text-cyan-800 border-cyan-800 aspect-square hover:text-white hover:bg-cyan-800 hover:cursor-pointer hover:scale-110">
            <BiPlus className="text-2xl " />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-auto h-full p-2 mx-4 my-2 border rounded shadow">
        {users.length !== 0 ? (
          users.map((user: User) => (
            <>
              <UserCard
                user={user}
                handleDelete={handleDelete}
                handleShow={handleShow}
              />
              <UserEditCard
                firstname={user.firstname}
                lastname={user.lastname}
                email={user.email}
                hidden={hidden}
                handleHide={handleHide}
                handleUpdate={handleUpdate}
              />
            </>
          ))
        ) : (
          <p className="text-xl font-bold text-cyan-700">
            Aucun utilisateur n'est trouvé
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
