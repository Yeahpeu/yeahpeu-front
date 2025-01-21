import MyProgressBar from "../components/MyProgressBar";

const OnboardProgressMolecule = ({ subject, progressPercent }) => {
  const pp = progressPercent;
  const sub = {
    weddingHall: "결혼식을 위한 일정들을 선택해주세요",
    styling: "스드메 탭 설명",
  };

  return (
    <div>
      <div className="text-red-300 font-bold">
        <p>{sub[subject]}</p>
      </div>
      <MyProgressBar progressPercent={pp} />
    </div>
  );
};

export default OnboardProgressMolecule;
