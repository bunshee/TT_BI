import { User } from "../../redux/models/models";

type Props = {
  user: User;
  handleShow: () => void;
  handleDelete: (email: string) => void;
};

const UserCard = (props: Props) => {
  return (
    <div className="flex flex-row w-full row-span-2 p-2 mb-2 border rounded shadow">
      <div className="flex flex-row items-start justify-start flex-1 gap-6">
        <p className="flex flex-col">
          <span className="font-bold text-cyan-600">Prénom: </span>
          {props.user.firstname}
        </p>
        <p className="flex flex-col">
          <span className="font-bold text-cyan-600">Nom: </span>
          {props.user.lastname}
        </p>
        <p className="flex flex-col">
          <span className="font-bold text-cyan-600">Adresse e-mail: </span>
          {props.user.email}
        </p>
      </div>
      <div className="flex flex-row items-end justify-end flex-1 gap-2">
        <button
          className="px-4 py-2 font-bold text-white rounded bg-amber-500 hover:bg-amber-700"
          onClick={props.handleShow}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={() => props.handleDelete(props.user.email)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
