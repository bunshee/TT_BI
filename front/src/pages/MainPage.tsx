import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { toast } from "react-toastify";
import { uploadFile, deleteData } from "./requests/requests";
import Data from "./components/Data";
import { Auth } from "../redux/models/models";
import { useSelector } from "react-redux/es/hooks/useSelector";

const MainPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadXlsxFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file as File);
      uploadFile(formData);
      toast.success("Fichier téléchargé");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors du téléchargement du fichier");
    }
  };
  const handleDeleteData = async () => {
    try {
      await deleteData();
      toast.success("Données supprimées");
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la suppression des données");
    }
  };

  useEffect(() => {
    if (file) {
      uploadXlsxFile();
    }
  }, [file]);

  const AuthUser = useSelector((state: Auth) => state);

  return (
    <div>
      <Navbar />
      {AuthUser.user.role === "admin" && (
        <div>
          <div className="flex flex-row items-end justify-end w-full gap-4">
            <div className="flex items-center justify-center w-full p-4">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-cyan-50 border-cyan-300 hover:bg-gradient-to-tr hover:from-cyan-200 hover:to-cyan-600 hover:border-cyan-500"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-cyan-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-cyan-500 ">
                    <span className="font-semibold">
                      Cliquer pour télécharger
                    </span>{" "}
                    Selectionner un fichier
                  </p>
                  <p className="text-xs text-cyan-500 ">XLS, XLSX, CSV</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept=".xls,.xlsx,.csv"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="p-6">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
              onClick={handleDeleteData}
            >
              Supprimer les données
            </button>
          </div>
        </div>
      )}
      <Data />
    </div>
  );
};

export default MainPage;
