import React from "react";
import MyProgressBar from "../components/Cards/MyProgressBar";
import { CATEGORY_SUBJECTS } from "../components/onboardingSteps";
import FiveBoxProgress from "../components/Cards/OnboardingProgress";

const OnboardingProgressMolecule = ({ subject, progressPercent }) => {
  return (
    <div className="flex flex-col gap-2 my-1">
      <div>
        <FiveBoxProgress progressPercent={progressPercent} />
        <p className="text-base mt-3 font-bold">
          {CATEGORY_SUBJECTS[subject].title}
        </p>
      </div>
      <div className="text-gray-700 text-xs">
        <p>{CATEGORY_SUBJECTS[subject]?.subject}</p>
      </div>
    </div>
  );
};

export default OnboardingProgressMolecule;
