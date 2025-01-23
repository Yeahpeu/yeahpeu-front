import MyButton from "./MyButton";

const MyConfirm = ({
  message,
  onCancel,
  onConfirm,
  optionLeft,
  optionRight,
}) => {
  return (
    <div className="flex-col justify-center bg-white rounded-lg shadow-lg p-4 w-full border">
      <p className="text-center mb-4 mt-4 font-bold text-lg">{message}</p>
      <div className="flex justify-center w-[80%] mx-auto space-x-8">
        <MyButton
          value={optionLeft}
          color="abled"
          disabled={false}
          onClick={onCancel}
        />
        <MyButton
          value={optionRight}
          color="abled"
          disabled={false}
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default MyConfirm;
