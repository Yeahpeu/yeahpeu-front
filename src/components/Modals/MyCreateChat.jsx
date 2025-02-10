import { useState } from "react";
import MyButton from "../common/MyButton";
import MyInputW from "../common/MyInput-white";
import MySelect from "../common/MySelect";
import { useCreateRoom } from "../../api/chatAPI";
import imageCompression from "browser-image-compression";
import axiosInstance from "../../api/axiosInstance";

const MyCreateChat = ({ onCancel, onConfirm, visible }) => {
  if (!visible) return null;

  const { mutate: createRoom } = useCreateRoom();

  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const memberOptions = [
    { value: "", label: "인원 수 선택" },
    { value: 10, label: "10명" },
    { value: 20, label: "20명" },
    { value: 30, label: "30명" },
    { value: 40, label: "40명" },
    { value: 50, label: "50명" },
    { value: 100, label: "100명" },
    { value: 200, label: "200명" },
    { value: 300, label: "300명" },
    { value: 400, label: "400명" },
    { value: 500, label: "500명" },
    { value: 1000, label: "1000명" },
  ];

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleMembersChange = (e) => {
    setSelectedMembers(e.target.value);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setFileName(file.name);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const convertedFile = new File([compressedFile], file.name, {
        type: file.type,
        lastModified: new Date().getTime(),
      });

      const formData = new FormData();
      formData.append("file", convertedFile);

      const response = await axiosInstance.post(
        "/api/v1/assets/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(response.data.url);
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const createRoomHandle = (groupName, selectedMembers) => {
    onConfirm();
    const roomInfo = {
      title: groupName,
      reservedMemberCount: selectedMembers,
      imageUrl: imageUrl,
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
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-gray-700 text-m font-medium w-20">
            <b>이미지</b>
          </label>
          <div className="flex flex-col w-full">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="room-image-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="room-image-upload"
                className={`px-3 py-1 text-xs border rounded cursor-pointer hover:bg-gray-50 ${
                  isUploading ? "opacity-50" : ""
                }`}
              >
                {isUploading ? "업로드 중..." : "선택"}
              </label>
              {fileName && (
                <span className="text-xs text-gray-600 truncate flex-1">
                  {fileName}
                </span>
              )}
            </div>
          </div>
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
