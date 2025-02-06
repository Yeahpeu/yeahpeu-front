const MyDeleteTaskButton = ({ onClick }) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center w-6 h-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="red"
        className="w-5 h-5 transition"
      >
        <path d="M19 13H5v-2h14v2Z" />
      </svg>
    </div>
  );
};

export default MyDeleteTaskButton;
