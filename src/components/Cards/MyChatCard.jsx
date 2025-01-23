const MyChatCard = ({
  roomTitle,
  currentMember,
  maxMember,
  imgSrc,
  onClick,
}) => {
  return (
    <div
      className="flex flex-row shadow-sm shadow-slate-300 border rounded-md gap-5 my-2 p-2 "
      onClick={onClick}
    >
      <img className="p-1 w-20 h-20" src={`${imgSrc}`} alt="roomOwnerImg" />
      <div className="flex flex-col justify-between text-left gap-1">
        <div className="font-bold text-lg">{roomTitle}</div>
        <div className="text-sm text-right">
          {currentMember}/{maxMember}명
        </div>
      </div>
    </div>
  );
};

export default MyChatCard;
