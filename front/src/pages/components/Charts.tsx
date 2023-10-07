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
import { Pie, Doughnut } from "react-chartjs-2";
import { DataModel } from "../../redux/models/models";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";

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

const Charts = (props: Props) => {
  const [dureeExecution, setDureeExecution] = useState<number[]>([]);
  const [type, setType] = useState<number[]>([]);
  const [travailleurs, setTravailleurs] = useState<string[]>([]);
  const [OTTravailleur, setOTTravailleur] = useState<number[]>([]);
  const [OTStatus, setOTStatus] = useState<number[]>([]);
  const status = [
    "Completed",
    "In progress",
    "Refused",
    "On hold",
    "Assigned",
    "Unassigned",
    "Canceled",
  ];
  const [Fournisseurs, setFournisseurs] = useState<string[]>([]);
  const [OTFournisseur, setOTFournisseur] = useState<number[]>([]);

  const getDureeExecution = () => {
    try {
      const execution = [0, 0, 0, 0];
      props.data.map((data) => {
        const duree = Number(data["Durée Exécution"]);
        if (duree <= 24) {
          execution[0] += 1;
        } else if (duree <= 48) {
          execution[1] += 1;
        } else if (duree <= 72) {
          execution[2] += 1;
        } else {
          execution[3] += 1;
        }
      });
      setDureeExecution(execution);
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

  const getType = () => {
    try {
      const type = [0, 0];
      props.data.map((data) => {
        if (data.Type === "Dérangement") {
          type[0] += 1;
        } else if (data.Type === "Raccordement") {
          type[1] += 1;
        }
      });
      setType(type);
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

  const getOTTravailleur = () => {
    try {
      const OTTravailleur: number[] = [];
      travailleurs.map((travailleur) => {
        const OT = props.data.filter(
          (data) => data["Nom Travailleur"] === travailleur
        );
        OTTravailleur.push(OT.length);
      });
      setOTTravailleur(OTTravailleur);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  const getOTStatus = () => {
    try {
      const OTStatus: number[] = [];
      status.map((status) => {
        const OT = props.data.filter((data) => data["Status WF"] === status);
        OTStatus.push(OT.length);
      });
      setOTStatus(OTStatus);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  const getOTFournisseur = () => {
    try {
      const OTFournisseur: number[] = [];
      Fournisseurs.map((fournisseur) => {
        const OT = props.data.filter(
          (data) => data["Fournisseur"] === fournisseur
        );
        OTFournisseur.push(OT.length);
      });
      setOTFournisseur(OTFournisseur);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  useEffect(() => {
    getDureeExecution();
    getType();
    getTravailleurs();
    getOTTravailleur();
    getOTStatus();
    getFournisseurs();
    getOTFournisseur();
  }, [props.data]);

  const dureeTravail = {
    labels: ["24h", "48h", "72h", ">72h"],
    datasets: [
      {
        label: "Durée d'exécution",
        data: dureeExecution,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const OTFournisseurData = {
    labels: Fournisseurs,
    datasets: [
      {
        label: "OT par fournisseur",
        data: OTFournisseur,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",

          "rgba(255, 206, 86, 0.2)",

          "rgba(75, 192, 192, 0.2)",

          "rgba(153, 102, 255, 0.2)",

          "rgba(255, 159, 64, 0.2)",

          "rgba(255, 29, 182, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",

          "rgba(255, 206, 86, 0.2)",

          "rgba(75, 192, 192, 0.2)",

          "rgba(153, 102, 255, 0.2)",

          "rgba(255, 159, 64, 0.2)",

          "rgba(255, 29, 182, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const OTTravailleurData = {
    labels: travailleurs,
    datasets: [
      {
        label: "OT par travailleur",
        data: OTTravailleur,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const typeTravail = {
    labels: ["Dérangement", "Raccordement"],
    datasets: [
      {
        label: "Type de travail",
        data: type,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const OTStatusData = {
    labels: [
      "Achevé",
      "En cours",
      "Refusé",
      "En pause",
      "Assigné",
      "Non assigné",
      "Annulé",
    ],
    datasets: [
      {
        label: "OT par status",
        data: OTStatus,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",

          "rgba(255, 206, 86, 0.2)",

          "rgba(75, 192, 192, 0.2)",

          "rgba(153, 102, 255, 0.2)",

          "rgba(255, 159, 64, 0.2)",

          "rgba(255, 29, 182, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",

          "rgba(255, 206, 86, 0.2)",

          "rgba(75, 192, 192, 0.2)",

          "rgba(153, 102, 255, 0.2)",

          "rgba(255, 159, 64, 0.2)",

          "rgba(255, 29, 182, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-2 gap-4">
      <div className="flex flex-row row-span-2 gap-4 span-1">
        <div className="items-center justify-center flex-1 border rounded shadow ">
          <p className="text-xl font-bold text-center text-cyan-800">
            Répartition des OT par durée d'exécution
          </p>
          <Pie data={dureeTravail} />
        </div>
        <div className="items-center justify-center flex-1 border rounded shadow ">
          <p className="text-xl font-bold text-center text-cyan-800">
            Répartition des OT par type de de l'OT
          </p>
          <div>
            <Doughnut data={typeTravail} />
          </div>
        </div>
      </div>
      <div className="flex flex-row row-span-3 gap-4 span-1">
        <div className="items-center justify-center flex-1 border rounded shadow ">
          <p className="text-xl font-bold text-center text-cyan-800">
            Répartition des OT par travailleur
          </p>
          <div>
            <Doughnut data={OTTravailleurData} />
          </div>
        </div>
        <div className="items-center justify-center flex-1 border rounded shadow ">
          <p className="text-xl font-bold text-center text-cyan-800">
            Répartition des OT par status
          </p>
          <div>
            <Pie data={OTStatusData} />
          </div>
        </div>
        <div className="items-center justify-center flex-1 border rounded shadow ">
          <p className="text-xl font-bold text-center text-cyan-800">
            Répartition des OT par fournisseur
          </p>
          <div>
            <Doughnut data={OTFournisseurData} />
          </div>
        </div>
      </div>
      <LineChart data={props.data} />
    </div>
  );
};

export default Charts;
