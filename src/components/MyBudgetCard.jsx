const MyBudgetCard = ({ total, expend, balance, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 w-96 border space-y-4"
      onClick={onClick}
    >
      <div className="flex justify-between font-bold text-lg">
        <span>총 예산</span>
        <span>{total.toLocaleString()} 원</span>
      </div>
      <hr className="my-3" />
      <div className="text-lg space-y-2">
        <div className="flex justify-between font-bold text-gray-400">
          <b>지출 금액</b>
          <span>{expend.toLocaleString()} 원</span>
        </div>
        <div
          className={`flex justify-between font-bold ${balance >= 0 ? "text-blue-500" : "text-red-500"}`}
        >
          <span>{balance >= 0 ? "남은 금액" : "초과 금액"}</span>
          <span>{balance.toLocaleString()} 원</span>
        </div>
      </div>
    </div>
  );
};

export default MyBudgetCard;
