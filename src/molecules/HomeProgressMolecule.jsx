import React from "react";
import MyProgressBar from "../components/Cards/MyProgressBar";
import { useProgressBar } from "../api/homeAPI";

const HomeProgressMolecule = () => {
  const { data, isLoading } = useProgressBar();
  const marriagePercent = data?.percentage || 0;

  if (isLoading) {
    return (
      <div>
        <div className="text-red-300 font-bold">
          <p>로딩 중...</p>
        </div>
        <MyProgressBar progressPercent={0} />
      </div>
    );
  }

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
