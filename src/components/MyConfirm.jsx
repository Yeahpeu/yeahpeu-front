const MyConfirm = ({
  message,
  onCancel,
  onConfirm,
  optionLeft,
  optionRight,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-96 border">
      <p className="text-center mb-4 mt-4">
        <b>{message}</b>
      </p>
      <div className="flex justify-center space-x-8">
        <button
          className="border bg-red-50 border-gray-300 rounded-lg p-2 w-1/4"
          onClick={onConfirm}
        >
          {optionLeft}
        </button>
        <button
          className="border bg-red-50 border-gray-300 rounded-lg p-2 w-1/4"
          onClick={onCancel}
        >
          {optionRight}
        </button>
      </div>
    </div>
  );
};

export default MyConfirm;
