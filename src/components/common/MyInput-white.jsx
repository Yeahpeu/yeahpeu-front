const MyInputWhite = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg p-2 w-full text-sm"
    />
  );
};

export default MyInputWhite;
