import MyButton from "../common/MyButton";

const MyConfirm = ({
  message,
  onCancel,
  onConfirm,
  optionLeft,
  optionRight,
  visible,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 어두운 오버레이 */}
      <div className="fixed inset-0 bg-black/50 z-30"></div>

      {/* 중앙에 위치하는 모달 */}

      <div className="relative z-50">
        <div className="flex-col justify-center bg-white rounded-lg shadow-lg p-5 px-10 max-w-lg border">
          <p
            style={{ whiteSpace: "pre-line" }}
            className="text-center mb-4 mt-4 font-bold text-base"
          >
            {message}
          </p>
          <div className="flex justify-between space-x-8 content-between">
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
      </div>
    </div>
  );
};

export default MyConfirm;
