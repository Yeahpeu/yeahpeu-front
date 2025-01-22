const MyCompleteButton = ({ isCompleted, onClick }) => {
  return (
    <div
      role="checkbox"
      aria-checked={isCompleted}
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center w-8 h-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-7 h-7 transition ${
          isCompleted ? "text-green-600" : "text-gray-500"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
};

export default MyCompleteButton;
