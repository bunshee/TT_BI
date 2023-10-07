import { DataModel } from "../../redux/models/models";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { toast } from "react-toastify";

export const options = {
  responsive: true,
};

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

type Props = {
  data: DataModel[];
};
const LineChart = (props: Props) => {
  const [actualData, setActualData] = useState<DataModel[]>(props.data);
  const [travailleurs, setTravailleurs] = useState<string[]>([]);
  const [Fournisseurs, setFournisseurs] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [OTDays, setOTDays] = useState<number[]>([]);
  const [uls, setUls] = useState<string[]>([]);
  const [searchOptions, setSearchOptions] = useState<{
    ul: string;
    start: string;
    end: string;
    type: string;
    status: string;
    execution: string;
    employee: string;
    supplier: string;
  }>({
    ul: "",
    start: "",
    end: "",
    type: "",
    status: "",
    execution: "",
    employee: "",
    supplier: "",
  });
  const getUls = () => {
    try {
      const uls: string[] = [];
      props.data.map((data) => {
        if (
          !uls.includes(data["OT Edité par"]) &&
          data["OT Edité par"] !== "null"
        ) {
          uls.push(data["OT Edité par"]);
        }
      });
      setUls(uls);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  const getDays = () => {
    try {
      const days: string[] = [];
      props.data.map((data) => {
        const day = data["Date affectation"].split(" ")[0];
        if (!days.includes(day) && day !== "null" && day !== "non") {
          days.push(day);
        }
      });
      days.sort();
      setDays(days);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  const getOTDays = async () => {
    try {
      const OTDays: number[] = [];
      await days.map((day) => {
        const OT = actualData.filter(
          (data) => data["Date affectation"].split(" ")[0] === day
        );
        OTDays.push(OT.length);
      });
      setOTDays(OTDays);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  const getFournisseurs = () => {
    try {
      const fournisseurs: string[] = [];
      props.data.map((data) => {
        if (
          !fournisseurs.includes(data["Fournisseur"]) &&
          data["Fournisseur"] !== "null"
        ) {
          fournisseurs.push(data["Fournisseur"]);
        }
      });
      setFournisseurs(fournisseurs);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  const getTravailleurs = () => {
    try {
      const travailleurs: string[] = [];
      props.data.map((data) => {
        if (
          !travailleurs.includes(data["Nom Travailleur"]) &&
          data["Nom Travailleur"] !== "null"
        ) {
          travailleurs.push(data["Nom Travailleur"]);
        }
      });
      setTravailleurs(travailleurs);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };
  console.log(actualData);

  useEffect(() => {
    getTravailleurs();
    getFournisseurs();
    getDays();
    getOTDays();
    getUls();
    setActualData(props.data);
  }, [props.data]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOptions({
      ...searchOptions,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    let data = props.data;
    if (searchOptions.ul !== "") {
      data = data.filter((data) => data["OT Edité par"] === searchOptions.ul);
    }
    if (searchOptions.start !== "") {
      data = data.filter(
        (data) => data["Date affectation"].split(" ")[0] >= searchOptions.start
      );
    }
    if (searchOptions.end !== "") {
      data = data.filter(
        (data) => data["Date affectation"].split(" ")[0] <= searchOptions.end
      );
    }
    if (searchOptions.type !== "") {
      data = data.filter((data) => data["Type"] === searchOptions.type);
    }
    if (searchOptions.status !== "") {
      data = data.filter((data) => data["Status WF"] === searchOptions.status);
    }
    if (searchOptions.execution !== "") {
      data = data.filter(
        (data) => data["Fournisseur"] === searchOptions.execution
      );
    }
    if (searchOptions.employee !== "") {
      data = data.filter(
        (data) => data["Nom Travailleur"] === searchOptions.employee
      );
    }
    if (searchOptions.supplier !== "") {
      data = data.filter(
        (data) => data["Durée Exécution"] === searchOptions.supplier
      );
    }
    setActualData(data);
  };

  const handleSearch = async () => {
    await handleFilter();
    await getOTDays();
  };

  const handleReset = async () => {
    await setSearchOptions({
      ul: "",
      start: "",
      end: "",
      type: "",
      status: "",
      execution: "",
      employee: "",
      supplier: "",
    });
    await setActualData(props.data);
    await getOTDays();
  };

  const data = {
    labels: days,
    datasets: [
      {
        label: "OT par jour",
        data: OTDays,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="flex flex-row row-span-1 gap-4 span-1 ">
      <div className="items-center justify-center flex-1 border rounded shadow">
        <p className="text-xl font-bold text-center text-cyan-800">
          Evolution des OT par jour
        </p>
        <div className="flex flex-col col-span-2 gap-2 p-4">
          <div className="flex flex-row row-span-4 gap-4 span-1">
            <select
              className="border rounded span-1"
              name="ul"
              onChange={handleChange}
              value={searchOptions.ul}
            >
              <option value="" selected>
                Selectionner un ULS
              </option>
              {uls.map((ul) => (
                <option value={ul}>{ul}</option>
              ))}
            </select>
            <select
              className="border rounded span-1"
              name="start"
              onChange={handleChange}
              value={searchOptions.start}
            >
              <option value="" selected>
                Selectionner une date debut
              </option>
              {days.map((day) => (
                <option value={day}>{day}</option>
              ))}
            </select>
            <select
              className="border rounded span-1"
              name="end"
              onChange={handleChange}
              value={searchOptions.end}
            >
              <option value="" selected>
                Selectionner une date fin
              </option>
              {days.map((day) => (
                <option value={day}>{day}</option>
              ))}
            </select>
            <select
              className="border rounded span-1"
              name="type"
              onChange={handleChange}
              value={searchOptions.type}
            >
              <option value="" selected>
                Selectionner un type
              </option>
              <option value="Dérangement">Dérangement</option>
              <option value="Raccordement">Raccordement</option>
            </select>
          </div>
          <div className="flex flex-row row-span-4 gap-4">
            <select
              className="border rounded span-1"
              name="status"
              onChange={handleChange}
              value={searchOptions.status}
            >
              <option value="" selected>
                Selectionner un status
              </option>
              <option value="Completed">Achevé</option>
              <option value="In progress">En cours</option>
              <option value="Refused">Refusé</option>
              <option value="On hold">En pause</option>
              <option value="Assigned">Assigné</option>
              <option value="Unassigned">Non assigné</option>
              <option value="Canceled">Annulé</option>
            </select>
            <select
              className="border rounded span-1"
              name="execution"
              onChange={handleChange}
              value={searchOptions.execution}
            >
              <option value="" selected>
                Selectionner un fournisseur
              </option>
              {Fournisseurs.map((fournisseur) => (
                <option value={fournisseur}>{fournisseur}</option>
              ))}
            </select>
            <select
              className="border rounded span-1"
              name="employee"
              onChange={handleChange}
              value={searchOptions.employee}
            >
              <option value="" selected>
                Selectionner un travailleur
              </option>
              {travailleurs.map((travailleur) => (
                <option value={travailleur}>{travailleur}</option>
              ))}
            </select>
            <select
              className="border rounded span-1"
              name="supplier"
              onChange={handleChange}
              value={searchOptions.supplier}
            >
              <option value="" selected>
                Selectionner durée d'exécution
              </option>
              <option value="24">24h</option>
              <option value="48">48h</option>
              <option value="72">72h</option>
              <option value=">72">{">72h"}</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center row-span-4 gap-4 span-1">
          <button
            className="p-2 text-xl font-bold text-white border rounded span-1 bg-cyan-800"
            onClick={handleSearch}
          >
            Rechercher
          </button>
          <button
            className="p-2 text-xl font-bold text-white bg-red-800 border rounded span-1"
            onClick={handleReset}
          >
            Réinitialiser
          </button>
        </div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineChart;
