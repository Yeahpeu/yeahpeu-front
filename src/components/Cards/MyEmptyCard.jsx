import emptyImg from "../../assets/emptybox.png";

const MyEmptyCard = ({ value }) => {
  return (
    <div className="flex flex-col justify-center">
      <img src={emptyImg} className="w-[100%] mb-6" />

      {/* <div className="text-[400%] font-bold mb-4">텅</div> */}
      <div className="text-lg">{value}</div>
    </div>
  );
};

export default MyEmptyCard;
