import { useState } from "react";
import MyButton from "../common/MyButton";
import MyInputW from "../common/MyInput-white";
import MySelect from "../common/MySelect";
import { useCreateRoom } from "../../api/chatAPI";

const MyCreateChat = ({ onCancel, onConfirm, visible }) => {
  if (!visible) return null;

  const { mutate: createRoom } = useCreateRoom();

  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState(0);

  const memberOptions = [
    { value: "", label: "인원 수 선택" },
    { value: 100, label: "100명" },
    { value: 200, label: "200명" },
    { value: 300, label: "300명" },
    { value: 400, label: "400명" },
    { value: 500, label: "500명" },
    { value: 600, label: "600명" },
    { value: 700, label: "700명" },
    { value: 800, label: "800명" },
    { value: 900, label: "900명" },
  ];

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleMembersChange = (e) => {
    setSelectedMembers(e.target.value);
  };

  const createRoomHandle = (groupName, selectedMembers) => {
    onConfirm();
    const roomInfo = {
      title: groupName,
      reservedMemberCount: selectedMembers,
    };

    createRoom(roomInfo);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 어두운 오버레이 */}
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-10 flex flex-col justify-center bg-white rounded-lg shadow-lg p-6 w-[80%] max-w-md border">
        <h2 className="font-bold text-lg mb-2">채팅방 추가</h2>
        <hr className="border-gray-300 mb-4" />

        <div className="mb-4 flex items-center space-x-2">
          <label className="text-gray-700 text-m font-medium w-20">
            <b>그룹 명</b>
          </label>
          <MyInputW
            placeholder="3자 이상 15자 이하"
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
            className="placeholder:text-xs text-xs"
          />
        </div>

        <div className="mb-6 flex items-center space-x-2">
          <label className="text-gray-700 text-m font-medium w-20">
            <b>인원 수</b>
          </label>
          <MySelect
            placeholder="인원수를 설정하세요"
            options={memberOptions}
            value={selectedMembers}
            onChange={handleMembersChange}
          />
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
            color={!groupName || !selectedMembers ? "disabled" : "abled"}
            disabled={!groupName || !selectedMembers}
            onClick={() => createRoomHandle(groupName, selectedMembers)}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCreateChat;
