import { useEffect, useState } from "react";
import { getData } from "../requests/requests";
import { toast } from "react-toastify";
import DataCard from "./DataCard";
import { DataModel } from "../../redux/models/models";

const Data = () => {
  const [data, setData] = useState<DataModel[]>([]);

  useEffect(() => {
    try {
      getData().then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des colonnes");
    }
  }, []);

  return (
    <div className="p-2 m-2 border rounded shadow">
      <DataCard data={data} />
    </div>
  );
};

export default Data;
