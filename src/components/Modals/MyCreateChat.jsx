"use client";

import React, { memo, useState } from "react";
import MyButton from "../common/MyButton";
import MyInputW from "../common/MyInput-white";
import MySelect from "../common/MySelect";
import { useCreateRoom } from "../../api/chatAPI";
import imageCompression from "browser-image-compression";
import axiosInstance from "../../api/axiosInstance";
const MyCreateChat = memo(function MyCreateChat({
  onCancel,
  onConfirm,
  visible,
}) {
  if (!visible) return null;

  const { mutate: createRoom } = useCreateRoom();
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
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
    const value = e.target.value.trimStart();
    if (value.length <= 15) {
      setGroupName(value);
    }
  };

  const handleMembersChange = (e) => {
    setSelectedMembers(e.target.value);
  };

  const handleFileUpload = (e) => {
    // 모든 상태 초기화
    setFileName("");
    setAlertMessage("");
    setSelectedFile(null);

    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setAlertMessage("지원하지 않는 파일 형식입니다");
      e.target.value = ""; // 파일 인풋 초기화
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
  };

  const createRoomHandle = async (groupName, selectedMembers) => {
    if (isUploading) return;

    try {
      setIsUploading(true);
      let uploadedImageUrl = "";

      if (selectedFile) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(selectedFile, options);
        const convertedFile = new File([compressedFile], selectedFile.name, {
          type: selectedFile.type,
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

        uploadedImageUrl = response.data.url;
      }

      const roomInfo = {
        title: groupName,
        reservedMemberCount: selectedMembers,
        imageUrl: uploadedImageUrl,
      };

      await createRoom(roomInfo);
      onConfirm();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 어두운 오버레이 */}
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="z-50 flex flex-col justify-center bg-white rounded-lg shadow-lg p-6 w-[80%] max-w-md border">
        <h2 className="font-bold text-lg mb-2">채팅방 추가</h2>
        <hr className="border-gray-300 mb-4" />
        <div className="mb-6 flex items-center space-x-2">
          <label className="text-gray-700 text-m font-medium w-20">
            <b>그룹 명</b>
          </label>
          <MyInputW
            placeholder="15자 이하"
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
            maxLength={15}
            className="placeholder:text-xs text-xs w-full"
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
            <div className="flex items-center">
              <input
                type="file"
                accept="image/jpg, image/png, image/jpeg, image/webp"
                onChange={handleFileUpload}
                className="hidden"
                id="room-image-upload"
              />
              <label
                htmlFor="room-image-upload"
                className="px-3 py-1 text-xs border rounded cursor-pointer hover:bg-gray-50"
              >
                선택
              </label>
              {alertMessage && (
                <span className="text-xs text-red-500 truncate flex-1 ml-2">
                  {alertMessage}
                </span>
              )}
              {fileName && (
                <span className="text-xs text-gray-600 truncate flex-1 ml-2">
                  {fileName.length > 10
                    ? fileName.slice(0, 10) + "..."
                    : fileName}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <MyButton
            value="취소"
            color="abled"
            disabled={isUploading}
            onClick={onCancel}
          />
          <MyButton
            value={isUploading ? "생성 중..." : "추가"}
            color={
              !groupName || !selectedMembers || isUploading
                ? "disabled"
                : "abled"
            }
            disabled={!groupName || !selectedMembers || isUploading}
            onClick={() => createRoomHandle(groupName, selectedMembers)}
          />
        </div>
      </div>
    </div>
  );
});

export default MyCreateChat;
