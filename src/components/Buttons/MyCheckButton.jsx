const MyCheckButton = ({ value, checked, onChange, index }) => {
  const id = `checkbox-${index}`;

  return (
    <div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="hidden peer"
      />
      <label
        htmlFor={id}
        className="flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:bg-white peer-checked:font-bold peer-checked:border-red-200 peer-checked:text-gray-900 transition"
      >
        <div className="block">
          <div className="w-full text-sm">{value}</div>
        </div>
      </label>
    </div>
  );
};

export default MyCheckButton;
