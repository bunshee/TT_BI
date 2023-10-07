interface Props {
  title: string;
  number: number;
  name: string;
}

const NumberCard = (props: Props) => {
  return (
    <div className="flex-1 p-4 border rounded shadow">
      <p className="p-2 text-xl font-bold text-cyan-800">{props.title}</p>
      <div className="flex flex-row items-center justify-center">
        <div className="flex-1">
          <p className="text-5xl font-bold text-center text-cyan-800">
            {props.number}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xl font-bold text-center text-cyan-800">
            {props.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NumberCard;
