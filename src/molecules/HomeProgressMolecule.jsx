import MyProgressBar from "../components/Cards/MyProgressBar";

const HomeProgressMolecule = ({ marriagePercent }) => {
  return (
    <div>
      <div className="text-red-300 font-bold">
        <p> 결혼이 {marriagePercent}% 진행중이에요! </p>
      </div>
      <MyProgressBar progressPercent={marriagePercent} />
    </div>
  );
};

export default HomeProgressMolecule;
