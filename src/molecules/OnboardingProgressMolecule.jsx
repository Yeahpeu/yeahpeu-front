import React from "react";
import MyProgressBar from "../components/Cards/MyProgressBar";
import { STEP_DATA } from "../components/onboardingSteps";

const OnboardingProgressMolecule = ({ subject, progressPercent }) => {
  return (
    <div className="flex flex-col gap-2 my-1">
      <div>
        <p className="text-sm">{STEP_DATA[subject].title}</p>
        <MyProgressBar progressPercent={progressPercent} />
      </div>
      <div className="text-black text-xs">
        <p>{STEP_DATA[subject]?.subject}</p>
      </div>
    </div>
  );
};

export default OnboardingProgressMolecule;
