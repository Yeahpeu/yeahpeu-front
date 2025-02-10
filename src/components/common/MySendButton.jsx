const MySendButton = ({ onClick, disabled }) => {
  return (
    <div
      role="button"
      onClick={disabled ? undefined : onClick}
      className={`cursor-pointer flex items-center justify-center w-8 h-8 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <svg
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="16.5"
          cy="16.5"
          r="16.5"
          fill={disabled ? "#E5E7EB" : "#FAE1DD"}
        />
        <path
          d="M14.1099 18.6502L17.6899 15.0602M11.3999 11.3202L19.8899 8.49015C23.6999 7.22015 25.7699 9.30015 24.5099 13.1102L21.6799 21.6002C19.7799 27.3102 16.6599 27.3102 14.7599 21.6002L13.9199 19.0802L11.3999 18.2402C5.68993 16.3402 5.68993 13.2302 11.3999 11.3202Z"
          stroke="#292D32"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default MySendButton;
