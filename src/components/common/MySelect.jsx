const MySelect = ({ options, onChange, placeholder }) => {
  return (
    <div className="block w-full">
      <select
        onChange={onChange}
        className="h-10 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full py-2.5 px-1 focus:outline-none"
      >
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
