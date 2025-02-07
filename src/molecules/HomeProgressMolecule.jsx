import React, { useEffect, useState } from "react";
import MyProgressBar from "../components/Cards/MyProgressBar";
import { usePercentBar } from "../api/homeAPI";

const HomeProgressMolecule = () => {
  const [marriagePercent, setMarriagePercent] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      const data = await usePercentBar();
      setMarriagePercent(data.percentage);
    };

    fetchProgress();
  }, []);

  return (
    <div>
      <div className="text-red-300 font-bold">
        <p>
          {marriagePercent === 100
            ? "모든 결혼 계획이 완료되었어요!"
            : `결혼이 ${marriagePercent}% 진행 중이에요!`}
        </p>
      </div>

      <MyProgressBar progressPercent={marriagePercent} />
    </div>
  );
};

export default HomeProgressMolecule;
