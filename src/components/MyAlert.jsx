import MyButton from "./MyButton";
const MyAlert = ({ message, onConfirm }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-96 border">
      <p className="text-center mb-4 mt-4 font-bold text-lg">{message}</p>
      <div className="flex justify-center space-x-4">
        <MyButton
          value="확인"
          color="abled"
          disabled={false}
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default MyAlert;
