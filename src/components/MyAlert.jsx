import MyButton from "./MyButton";
const MyAlert = ({ message, onConfirm }) => {
  return (
    <div className="flex-col justify-center bg-white rounded-lg shadow-lg p-4 w-full border">
      <p className="text-center mb-4 mt-4 font-bold text-lg">{message}</p>
      <div className="flex justify-center w-1/2 mx-auto space-x-4">
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
