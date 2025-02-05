import emptyImg from "../../assets/emptybox.png";

const MyEmptyCard = ({ value }) => {
  return (
    <div className="flex flex-col justify-center">
      <img src={emptyImg} className="w-[100%]" />
      <div className="text-[400%] font-bold"> 텅 </div>
      {value}
    </div>
  );
};

export default MyEmptyCard;
