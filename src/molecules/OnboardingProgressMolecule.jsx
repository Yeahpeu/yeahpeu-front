import React from "react";
import MyProgressBar from "../components/Cards/MyProgressBar";
import { CATEGORY_SUBJECTS } from "../components/onboardingSteps";

const OnboardingProgressMolecule = ({ subject, progressPercent }) => {
  return (
    <div className="flex flex-col gap-2 my-1">
      <div>
        <p className="text-sm">{CATEGORY_SUBJECTS[subject].title}</p>
        <MyProgressBar progressPercent={progressPercent} />
      </div>
      <div className="text-black text-xs">
        <p>{CATEGORY_SUBJECTS[subject]?.subject}</p>
      </div>
    </div>
  );
};

export default OnboardingProgressMolecule;
