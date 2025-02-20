const MyButton = ({ value, color, disabled, onClick }) => {
  const colorVariants = {
    abled: "bg-red-100 rounded-lg p-2 w-full text-gray-500 font-bold",
    disabled: "bg-gray-100 rounded-lg p-2 w-full text-gray-500 font-bold ",
  };

  return (
    <button
      className={`${colorVariants[color]}`}
      disabled={disabled}
      onClick={onClick}
    >
      <p className="text-sm">{value}</p>
    </button>
  );
};

export default MyButton;
