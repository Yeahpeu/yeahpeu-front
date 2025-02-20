const MySearchBox = ({ value, setValue, onSearch, noSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      onSearch();
    }
  };
  if (noSearch) {
    return (
      <div className="w-full h-full mx-auto">
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="text-sm relative m-0 block min-w-0 flex-auto text-xs rounded-l border border-neutral-300 px-3 py-2 text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
            placeholder="검색어를 입력하세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-describedby="button-addon3"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full mx-auto">
      <div className="relative flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="text-sm relative m-0 block w-[80%] rounded-l border-y border-l border-neutral-300 px-4 py-2 text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary"
          placeholder="갖고 싶은 혼수를 검색하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-describedby="button-addon3"
        />

        <button
          className="relative w-[20%] z-[2] rounded-r border-[1px] border-primary border-neutral-300 px-5 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out focus:outline-none focus:ring-0"
          type="button"
          id="button-addon3"
          onClick={onSearch}
        >
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MySearchBox;
