import MyButton from "../common/MyButton";
import MyInputW from "../common/MyInput-white";
import MySelect from "../common/MySelect";

const MyCreateChat = ({ onCancel, onConfirm }) => {
  const memberOptions = [
    { value: 100 },
    { value: 200 },
    { value: 300 },
    { value: 400 },
    { value: 500 },
    { value: 600 },
    { value: 700 },
    { value: 800 },
    { value: 900 },
  ];

  return (
    <div className="flex flex-col justify-center bg-white rounded-lg shadow-lg p-6 w-full max-w-md border">
      <h2 className="font-bold text-lg mb-2">채팅방 추가</h2>
      <hr className="border-gray-300 mb-4" />

      <div className="mb-4 flex items-center space-x-2">
        <label className="text-gray-700 text-m  font-medium w-20">
          <b>그룹 명</b>
        </label>
        <MyInputW
          placeholder={"3자 이상 15자 이하"}
          type={"text"}
          className="placeholder:text-xs text-xs"
        />
      </div>

      <div className="mb-6 flex items-center space-x-2">
        <label className="text-gray-700 text-m font-medium w-20">
          <b>인원 수</b>
        </label>
        <MySelect placeholder={"인원수를 설정하세요"} options={memberOptions} />
      </div>

      <div className="flex justify-center space-x-4">
        <MyButton
          value="취소"
          color="abled"
          disabled={false}
          onClick={onCancel}
        />
        <MyButton
          value="추가"
          color="abled"
          disabled={false}
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default MyCreateChat;
