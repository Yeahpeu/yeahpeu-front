function FiveBoxProgress({ progressPercent }) {
  const filledBoxes = Math.min(Math.floor(progressPercent / 20), 5);

  return (
    <div className="flex items-center space-x-1 w-full">
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < filledBoxes;

        let boxClasses = "flex-1 h-5 border transition-all duration-300";
        boxClasses += isFilled
          ? " bg-red-300 border-red-300"
          : " bg-white border-gray-300";

        if (i === 0) {
          boxClasses += " rounded-l-[20%]";
        } else if (i === 4) {
          boxClasses += " rounded-r-[20%]";
        }

        return <div key={i} className={boxClasses} />;
      })}
    </div>
  );
}

export default FiveBoxProgress;
