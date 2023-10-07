import NumberCard from "./NumberCard";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { DataModel } from "../../redux/models/models";
import Charts from "./Charts";

type Props = {
  data: DataModel[];
};

const DataCard = (props: Props) => {
  const [occurance, setOccurance] = useState<number>(0);
  const [dureeMoyenneExecution, setDureeMmoyenneExecution] =
    useState<number>(0);
  const [dureeMoyenneAttribution, setDureeMoyenneAttribution] =
    useState<number>(0);
  const [dureeMoyenneTravail, setDureeMoyenneTravail] = useState<number>(0);

  const getOccuranceTotal = () => {
    try {
      setOccurance(props.data.length);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  const getDureeMoyenneExecution = () => {
    try {
      let total = 0;
      props.data.map((data) => {
        const travail = Number(data["Durée Exécution"]);
        if (!isNaN(travail)) {
          total += travail;
        }
      });

      setDureeMmoyenneExecution(Math.ceil(total / props.data.length));
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  const getDureeMoyenneAttribution = () => {
    try {
      let diffHours = 0;
      props.data.map((data) => {
        const date1 = new Date(data["Date affectation"]);
        const date2 = new Date(data.Échéance);
        const diff = Math.abs(date2.getTime() - date1.getTime());
        if (!isNaN(diff)) {
          diffHours += diff / (1000 * 60 * 60 * 24);
        }
      });
      setDureeMoyenneAttribution(Math.ceil(diffHours / props.data.length));
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };

  const getDureeMoyenneTravail = () => {
    try {
      let total = 0;
      props.data.map((data) => {
        const travail = Number(data["Durée Travail"]);
        if (!isNaN(travail)) {
          total += travail;
        }
      });

      setDureeMoyenneTravail(Math.ceil(total / props.data.length));
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de la récupération des données");
    }
  };
  useEffect(() => {
    getOccuranceTotal();
    getDureeMoyenneExecution();
    getDureeMoyenneAttribution();
    getDureeMoyenneTravail();
  }, [props.data]);

  return (
    <div className="flex-col gap-2 mb-2 ">
      <div className="flex flex-row row-span-3 gap-4 mb-3">
        <NumberCard title="nombre  total des OT" number={occurance} name="OT" />
        <NumberCard
          title="Durée Moyenne d'execution"
          number={dureeMoyenneExecution}
          name="Heures"
        />
        <NumberCard
          title="Durée Moyenne d'attribution"
          number={dureeMoyenneAttribution}
          name="Heures"
        />
        <NumberCard
          title="Durée Moyenne de travail"
          number={dureeMoyenneTravail}
          name="Heures"
        />
      </div>
      <Charts data={props.data} />
    </div>
  );
};

export default DataCard;
