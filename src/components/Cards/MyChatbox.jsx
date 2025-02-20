import { useChatStore } from "../../stores/chatStore";
import defaultAvatar from "../../assets/default_Image.jpg";
import { convertKST } from "../../data/util/timeUtils";
const MyChatBox = ({ owner, item }) => {
  const colorVariants = {
    others: "flex",
    mine: "flex flex-row-reverse",
  };

  const hasAttachment = item.attachments?.some((attachment) => attachment.url);
  const { chatUsers } = useChatStore();
  const cookies = document.cookie.split(";");
  const authToken = cookies
    .find((cookie) => cookie.trim().startsWith("authToken="))
    ?.split("=")[1];

  const handleDownload = async (url, fileName) => {
    try {
      // 새 창에서 인증된 URL 열기
      window.open(url, "_blank");
    } catch (error) {
      console.error("실패", error);
    }
  };

  // 파일명 자르기 함수 추가
  const truncateFileName = (fileName) => {
    const extension = fileName.split(".").pop();
    const nameWithoutExt = fileName.slice(0, fileName.lastIndexOf("."));

    // 한글, 영문, 특수문자 등의 실제 길이 계산
    let visibleLength = 0;
    let truncatedName = "";

    for (let char of nameWithoutExt) {
      // 한글은 길이를 1로 취급
      const charLength = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(char) ? 1 : 0.5;
      if (visibleLength + charLength > 10) break;
      truncatedName += char;
      visibleLength += charLength;
    }

    // 잘린 경우에만 '...' 추가
    const finalName =
      nameWithoutExt.length === truncatedName.length
        ? truncatedName
        : truncatedName + "...";

    return `${finalName}.${extension}`;
  };

  // message가 파일명인 경우 자르기 로직 적용
  const displayMessage = (message, attachmentRequests) => {
    if (attachmentRequests?.[0]?.url) {
      return truncateFileName(message);
    }
    return message;
  };

  const renderTextMessage = () => {
    if (hasAttachment) return null;
    if (!item.message) return null;

    const currentUser = chatUsers.items.find(
      (user) => user.id === item.sender.id
    );
    const nickname = item.sender.nickname || "알 수 없음 ";
    const avatarUrl = currentUser?.avatarUrl || defaultAvatar;

    return (
      <div
        className={`${colorVariants[owner]} items-start gap-2 ${
          owner === "mine" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {owner === "mine" || (
          <img
            src={avatarUrl}
            alt={`${nickname}의 프로필`}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div
          className={`flex flex-col gap-1 ${
            owner === "mine" ? "items-end" : "items-start"
          }`}
        >
          {owner === "mine" || (
            <span className="text-sm text-gray-600">{nickname}</span>
          )}
          <div className="flex flex-row gap-1 items-end">
            {owner === "mine" && (
              <span className="text-xs text-gray-500">
                {convertKST(item.sentAt).time}
              </span>
            )}
            <div
              className={`rounded-lg p-2 shadow-sm block w-fit ${
                owner === "mine" ? "bg-gray-100" : "bg-red-100"
              }`}
            >
              <span
                className="block break-all whitespace-pre-wrap max-w-64 max-h-96 overflow-y-auto text-start break-words"
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto",
                }}
              >
                {displayMessage(item.message, item.attachments)}
              </span>
            </div>
            {owner !== "mine" && (
              <span className="text-xs text-gray-500">
                {convertKST(item.sentAt).time}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderImageAttachment = (attachment, index) => {
    if (!attachment.contentType?.startsWith("image/")) return null;

    const currentUser = chatUsers.items.find(
      (user) => user.id === item.sender.id
    );
    const nickname = item.sender.nickname || "알 수 없음 ";
    const avatarUrl = currentUser?.avatarUrl || defaultAvatar;
    const fileName = attachment.url.split("/").pop() || "image.jpg";

    return (
      <div
        key={index}
        className={`${colorVariants[owner]} items-start gap-2 ${
          owner === "mine" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {owner === "mine" || (
          <img
            src={avatarUrl}
            alt={`${nickname}의 프로필`}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div
          className={`flex flex-col gap-1 ${
            owner === "mine" ? "items-end" : "items-start"
          }`}
        >
          {owner === "mine" || (
            <span className="text-sm text-gray-600">{nickname}</span>
          )}
          <div className="flex flex-row gap-1 items-end">
            {owner === "mine" && (
              <span className="text-xs text-gray-500">
                {convertKST(item.sentAt).time}
              </span>
            )}
            <div
              className={`rounded-lg p-2 shadow-sm ${
                owner === "mine" ? "bg-gray-100" : "bg-red-200"
              }`}
            >
              <img
                src={attachment.url}
                alt="첨부 이미지"
                className="max-h-40 rounded-lg object-contain cursor-pointer hover:opacity-80 transition-opacity"
                loading="lazy"
                onClick={() => handleDownload(attachment.url, fileName)}
              />
            </div>
            {owner !== "mine" && (
              <span className="text-xs text-gray-500">
                {convertKST(item.sentAt).time}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFileAttachment = (attachment, index) => {
    if (attachment.contentType?.startsWith("image/")) return null;

    const currentUser = chatUsers.items.find(
      (user) => user.id === item.sender.id
    );
    const nickname = item.sender.nickname || "알 수 없음 ";
    const avatarUrl = currentUser?.avatarUrl || defaultAvatar;

    const fileName =
      item.message || attachment.url.split("/").pop() || "파일 다운로드";

    // 기존의 truncatedFileName 로직을 truncateFileName 함수 호출로 변경
    const truncatedFileName = truncateFileName(fileName);

    return (
      <div
        key={index}
        className={`${colorVariants[owner]} items-start gap-2 ${
          owner === "mine" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {owner === "mine" || (
          <img
            src={avatarUrl}
            alt={`${nickname}의 프로필`}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div
          className={`flex flex-col gap-1 ${
            owner === "mine" ? "items-end" : "items-start"
          }`}
        >
          {owner === "mine" || (
            <span className="text-sm text-gray-600">{nickname}</span>
          )}
          <div className="flex flex-row gap-1 items-end">
            {owner === "mine" && (
              <span className="text-xs text-gray-500">
                {convertKST(item.sentAt).time}
              </span>
            )}
            <div
              className={`rounded-lg p-2 shadow-sm ${
                owner === "mine" ? "bg-gray-100" : "bg-red-200"
              }`}
            >
              <button
                onClick={() => handleDownload(attachment.url, fileName)}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                title={fileName}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>{truncatedFileName}</span>
              </button>
            </div>
            {owner !== "mine" && (
              <span className="text-xs text-gray-500">
                {convertKST(item.sentAt).time}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAttachments = () => {
    return item.attachments?.map((attachment, index) => {
      if (!attachment.url) return null;

      return attachment.contentType?.startsWith("image/")
        ? renderImageAttachment(attachment, index)
        : renderFileAttachment(attachment, index);
    });
  };

  return (
    <>
      {renderTextMessage()}
      {renderAttachments()}
    </>
  );
};

export default MyChatBox;
