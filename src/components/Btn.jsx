const Btn = ({ width, onClick }) => {
  return (
    <button
      className={`rounded-md p-1 bg-red-300 border-2 w-${width}`}
      //NOTE - onClick은 page부터 useNavigate를 전달받아서 작동, 다른 함수를 전달받으면 그 함수를 작동 (재사용을 위해)
      onClick={onClick}
    >
      다음
    </button>
  );
};

export default Btn;
