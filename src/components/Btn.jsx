const Btn = ({ width, onClick }) => {
  return (
    <button
      className={`rounded-md p-1 bg-red-300 border-2 w-${width}`}
      onClick={onClick}
    >
      다음
    </button>
  );
};

export default Btn;
