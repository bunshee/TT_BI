import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 mb-5 h-80">
      <p className="text-3xl text-blue-800">Unauthorized</p>
      <div>
        <button
          className="p-5 text-white bg-blue-800 border rounded-lg"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
