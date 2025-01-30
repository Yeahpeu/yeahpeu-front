import React from "react";
import { useNavigate } from "react-router-dom";
import OnboardingProgressMolecule from "../molecules/OnboardingProgressMolecule";
import OnboardingSelectionMolecule from "../molecules/OnboardingSelectionMolecule";
import useOnboardingStore from "../stores/onboardingStore";
import { STEP_KEYS } from "../components/onboardingSteps";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { currentStep, getCurrentProgress } = useOnboardingStore();
  const currentStepKey = STEP_KEYS[currentStep];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center relative">
        {currentStep > 0 && (
          <button onClick={() => navigate(-1)} className="absolute left-4">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        <h1 className="text-xl text-red-300 font-medium text-center w-full">
          일정 수립하기
        </h1>
      </header>

      <div className="px-4 py-2">
        <OnboardingProgressMolecule
          subject={currentStepKey}
          progressPercent={getCurrentProgress()}
        />
      </div>

      <div className="flex-1 mt-4">
        <OnboardingSelectionMolecule />
      </div>
    </div>
  );
};

export default OnboardingPage;
