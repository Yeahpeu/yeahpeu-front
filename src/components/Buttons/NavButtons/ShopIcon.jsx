const ShopIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 960 960"
        strokeWidth="1.5"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M280 880q-33 0-56.5-23.5T200 800q0-33 23.5-56.5T280 720q33 0 56.5 23.5T360 800q0 33-23.5 56.5T280 880Zm400 0q-33 0-56.5-23.5T600 800q0-33 23.5-56.5T680 720q33 0 56.5 23.5T760 800q0 33-23.5 56.5T680 880ZM246 240l96 200h280l110-200H246ZM208 160h590q23 0 35 20.5t1 41.5L692 478q-11 20-29.5 31T622 520H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280H342Z"
        />
      </svg>
      <span className="text-xs">카트</span>
    </>
  );
};

export default ShopIcon;
