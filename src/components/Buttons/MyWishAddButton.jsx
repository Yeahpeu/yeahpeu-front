const MyWishAddButton = ({ isCompleted, onClick }) => {
  return (
    <div
      role="checkbox"
      aria-checked={isCompleted}
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center w-6 h-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 transition ${
          isCompleted ? "text-red-300" : "text-gray-500"
        } border rounded-md shadow-sm `}
        fill="currentColor"
        viewBox="0 -960 960 960"
      >
        <path d="m511-270 136-136q10-10 15-22.96 5-12.97 5-27.66Q667-486 647.39-507q-19.61-21-47.39-21-20.36 0-40.18 12T511-473q-31.87-32.08-49.94-43.54Q443-528 423-528q-28.61 0-48.8 20.78Q354-486.44 354-457q0 14 5.69 27.54Q365.38-415.93 375-406l136 136Zm332-129L562-117q-11 11-24 16t-27 5q-14 0-27-5t-24-16L116.7-460.3Q106-471 101-483.89T96-511v-281q0-29.7 21.15-50.85Q138.3-864 168-864h281q13.91 0 26.96 5 13.04 5 23.77 15.7L843-500q11 11 16 23.5t5 26.5q0 14-5.02 27.09Q853.96-409.83 843-399ZM511-168l281-281-343-343H168v281l343 343ZM264-636q25 0 42.5-17.5T324-696q0-25-17.5-42.5T264-756q-25 0-42.5 17.5T204-696q0 25 17.5 42.5T264-636Zm216 156Z" />
      </svg>
    </div>
  );
};

export default MyWishAddButton;
