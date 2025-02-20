import React from "react";
import addwish from "../../assets/addwish.png";
import minuswish from "../../assets/minuswish.png";

const MyWishAddButton = ({ isCompleted, onClick }) => {
  return (
    <div
      role="checkbox"
      aria-checked={isCompleted}
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center w-7 h-7"
    >
      <img
        src={isCompleted ? minuswish : addwish}
        className="w-6 h-6 transition"
      />
    </div>
  );
};

export default MyWishAddButton;
