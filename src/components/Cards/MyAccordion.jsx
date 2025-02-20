import { useRef } from "react";
import { Link } from "react-router-dom";

const MyAccordion = ({ isOpen, onClick, title, value, percent }) => {
  const contentRef = useRef(null);

  return (
    <div id="accordionExample" className="pb-1">
      <div className="rounded-lg border-neutral-200 shadow-md bg-white ">
        <h2 className="mb-0" id="headingOne">
          <button
            className={`group relative flex w-full  rounded-lg border-0 bg-white px-5 py-3 text-left text-sm text-neutral-800 transition hover:z-[2] focus:z-[3] focus:outline-none ${
              isOpen
                ? "bg-white text-primary shadow-border-b dark:bg-surface-dark dark:text-primary dark:shadow-white/10"
                : ""
            }`}
            type="button"
            onClick={onClick}
            aria-expanded={isOpen}
            aria-controls="collapseOne"
          >
            <div className="flex w-full space-x-3 ">
              <div className="font-bold">{title}</div>
              <div className="text-gray-400">{percent}%</div>
            </div>
            <span
              className={`-me-1 ms-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseOne"
          ref={contentRef}
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
          style={{
            maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          }}
          aria-labelledby="headingOne"
        >
          <div className="px-5 pb-3 text-sm ml-2">
            {value.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-gray-500 py-1"
              >
                <div>{item.subTitle}</div>
                <div>{(item.price ?? 0).toLocaleString()} 원</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccordion;
