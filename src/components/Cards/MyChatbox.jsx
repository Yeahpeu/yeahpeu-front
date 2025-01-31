const MyChatBox = ({ owner, message }) => {
  const colorVariants = {
    others: "bg-red-100 rounded-lg p-1 w-[60%] text-gray-500 font-bold shadow",
    mine: "bg-white rounded-lg p-1 w-[60%] text-gray-500 font-bold shadow",
  };
  return (
    <div className={`${colorVariants[owner]}`}>
      <span>{message}</span>
    </div>
  );
};

export default MyChatBox;
