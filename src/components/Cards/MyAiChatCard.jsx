import judgeIcon from "../../assets/judgeIcon.png";

const MyAiChatCard = ({ roomTitle }) => {
  return (
    <div className="flex flex-row">
      <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-full">
        <img
          className="w-full h-full object-cover"
          src={judgeIcon}
          alt="roomOwnerImg"
        />
      </div>
    </div>
  );
};

export default MyAiChatCard;
