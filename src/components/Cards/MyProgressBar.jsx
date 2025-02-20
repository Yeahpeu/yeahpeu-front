import ProgressBar from "@ramonak/react-progress-bar";

const MyProgressBar = ({ progressPercent }) => {
  return (
    <ProgressBar
      completed={progressPercent}
      width="100%"
      height="30px"
      bgColor="#ffffff"
      baseBgColor="#f1f1f1"
      animateOnRender={true}
      className="border border-gray-200 rounded-3xl shadow-inner shadow-slate-300"
      customLabel=" "
      labelSize="25px"
    />
  );
};

export default MyProgressBar;
