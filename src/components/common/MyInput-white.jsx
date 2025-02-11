const MyInputWhite = ({ type, placeholder, value, onChange, className }) => {
  // date와 time 타입을 위한 추가 스타일
  const dateTimeStyles =
    type === "date" || type === "time" ? "appearance-none bg-white" : "";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        ${className} 
        ${dateTimeStyles}
        w-full
        px-3 
        py-2 
        text-sm
        border
        border-gray-300 
        rounded-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-red-100
        focus:border-red-200
        disabled:opacity-50
        disabled:cursor-not-allowed
      `}
    />
  );
};

export default MyInputWhite;
