const MyChatCard = ({
  roomTitle,
  currentMember,
  maxMember,
  imgSrc,
  lastMessageText,
  unseenMessageCount,
}) => {
  return (
    <div className="flex flex-row shadow-sm border-gray-500 shadow-slate-300 bg-white rounded-md gap-5 p-4">
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
        <img
          className="w-full h-full object-cover"
          src={`${imgSrc}`}
          alt="roomOwnerImg"
        />
      </div>
      <div className="flex flex-col w-full justify-between text-left gap-1">
        <div className="font-bold text-sm break-all text-gray-700">
          {roomTitle}
        </div>
        <div className="flex flex-row justify-between">
          {lastMessageText && (
            <div className="break-all w-full text-xs">
              {lastMessageText.length > 25
                ? `${lastMessageText.slice(0, 25)}...`
                : lastMessageText}
            </div>
          )}

          {unseenMessageCount !== 0 && (
            <div className="w-[15%] text-sm flex items-center justify-center bg-red-400 text-white rounded-full h-6">
              {unseenMessageCount > 99 ? "99+" : unseenMessageCount}
            </div>
          )}
        </div>

        <div className="text-xs text-right mr-1">
          {currentMember}/{maxMember}명
        </div>
      </div>
    </div>
  );
};

export default MyChatCard;
