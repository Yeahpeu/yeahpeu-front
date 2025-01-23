import ProgressBar from "@ramonak/react-progress-bar";

const MyProgressBar = ({ progressPercent }) => {
  return (
    <ProgressBar
      completed={progressPercent}
      height="40px"
      bgColor="#fecaca"
      animateOnRender="true"
      className="shadow-md shadow-slate-300 rounded-3xl"
      customLabel="💐"
      labelSize="30px"
    />
  );
};

export default MyProgressBar;
