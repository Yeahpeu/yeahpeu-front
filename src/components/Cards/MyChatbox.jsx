const MyChatBox = ({ owner, item }) => {
  const colorVariants = {
    others:
      "flex justify-center bg-red-100 rounded-lg pb-1 p-1 w-[60%] text-gray-500 font-bold shadow",
    mine: "flex justify-center bg-white rounded-lg p-1 w-[60%] text-gray-500 font-bold shadow",
  };

  const hasAttachment = item.attachments?.some((attachment) => attachment.url);

  const renderTextMessage = () => {
    if (hasAttachment) return null;
    if (!item.message) return null;

    return <span className="block">{item.message}</span>;
  };

  const renderImageAttachment = (attachment, index) => {
    if (!attachment.contentType?.startsWith("image/")) return null;

    return (
      <div key={index} className="flex justify-center">
        <img
          src={attachment.url}
          alt="첨부 이미지"
          className="max-h-80 w-full rounded-lg object-cover"
          loading="lazy"
        />
      </div>
    );
  };

  const renderFileAttachment = (attachment, index) => {
    if (attachment.contentType?.startsWith("image/")) return null;

    return (
      <div key={index} className="flex justify-center">
        <a
          href={attachment.url}
          download
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
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
          {item.message || "파일 다운로드"}
        </a>
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
    <div className={`${colorVariants[owner]}`}>
      {renderTextMessage()}
      {renderAttachments()}
    </div>
  );
};

export default MyChatBox;
