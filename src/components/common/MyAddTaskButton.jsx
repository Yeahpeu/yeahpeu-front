const MyAddTaskButton = ({ onClick }) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center w-8 h-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        fill="#5f6368"
        className="w-7 h-7 transition"
      >
        <path d="M14 10H3v-2h11v2zm0-4H3V4h11v2zm-11 6h8v2H3v-2zm13 0v-3h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
      </svg>
    </div>
  );
};

export default MyAddTaskButton;
