// const colorVariants = {
//     abled: "border bg-red-50 border-gray-300 rounded-lg p-2 w-full",
//     disabled: "border bg-gray-50 border-gray-300 rounded-lg p-2 w-full",
// };

const MyAlert = ({ message, onConfirm }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-96 border">
      <p className="text-center mb-4 mt-4 font-bold text-lg">{message}</p>
      <div className="flex justify-center space-x-4">
        <button
          className="border bg-red-50 border-gray-300 rounded-lg p-2 w-1/4 text-sm"
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default MyAlert;
