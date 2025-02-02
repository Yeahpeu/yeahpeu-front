import { useNavigate } from 'react-router-dom';

const MyAddButton = ({ isCompleted }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/schedule/todos/input');
  };

  return (
    <div
      role="button"
      aria-checked={isCompleted}
      onClick={handleClick}
      className="cursor-pointer flex items-center justify-center w-8 h-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 transition text-gray-500"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
      </svg>
    </div>
  );
};

export default MyAddButton;
