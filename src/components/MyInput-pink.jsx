const MyInputPink = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border bg-red-50 border-gray-300 rounded-lg p-2 w-full"
    ></input>
  );
};

export default MyInputPink;
