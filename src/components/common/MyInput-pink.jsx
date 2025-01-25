const MyInputPink = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border bg-red-50 border-gray-300 rounded-lg p-2 w-full"
    ></input>
  );
};

export default MyInputPink;
