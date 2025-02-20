const MyInputPink = ({
  type,
  placeholder,
  value,
  onChange,
  maxLength,
  disabled,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border bg-red-50 border-gray-300 rounded-lg p-2 w-full focus:outline-none 
        focus:ring-2 
        focus:ring-red-100
        focus:border-red-200"
      maxLength={maxLength}
      disabled={disabled}
    ></input>
  );
};

export default MyInputPink;
