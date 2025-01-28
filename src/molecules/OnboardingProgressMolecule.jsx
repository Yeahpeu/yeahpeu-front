import React from "react";
import MyProgressBar from "../components/Cards/MyProgressBar";
import { STEP_DATA } from "../components/onboardingSteps";

const OnboardingProgressMolecule = ({ subject, progressPercent }) => {
  return (
    <div>
      <div className="text-red-300 font-bold">
        <p>{STEP_DATA[subject]?.subject || ""}</p>
      </div>
      <MyProgressBar progressPercent={progressPercent} />
    </div>
  );
};

export default OnboardingProgressMolecule;
