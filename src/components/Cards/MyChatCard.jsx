const MyChatCard = ({
  roomTitle,
  currentMember,
  maxMember,
  imgSrc,
  lastMessageText,
  unseenMessageCount,
}) => {
  return (
    <div className="flex flex-row shadow-sm shadow-slate-300 border rounded-md gap-5 my-2 p-2">
      <img className="p-1 w-20 h-20" src={`${imgSrc}`} alt="roomOwnerImg" />
      <div className="flex flex-col justify-between text-left gap-1">
        <div className="font-bold text-lg">{roomTitle}</div>
        <div className="flex flex-row justify-between">
          <div className="w-[90%]">{lastMessageText}</div>
          <div className="w-[15%] text-sm flex items-center justify-center bg-red-500 text-white rounded-full h-6">
            {unseenMessageCount}
          </div>
        </div>

        <div className="text-sm text-right">
          {currentMember}/{maxMember}명
        </div>
      </div>
    </div>
  );
};

export default MyChatCard;
