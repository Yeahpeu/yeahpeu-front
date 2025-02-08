import React from "react";
import MyCheckButton from "../components/Buttons/MyCheckButton";
import useOnboardingStore from "../stores/onboardingStore";
import { useSubmitOnboardingMutation } from "../api/onboardingAPI";
import { STEP_KEYS, CATEGORY_KEYS } from "../components/onboardingSteps";

const OnboardingSelectionMolecule = () => {
  const { currentStep, selectedCategoryIds, toggleCategoryId, category } =
    useOnboardingStore();
  const submitMutation = useSubmitOnboardingMutation();

  const currentStepKey = STEP_KEYS[currentStep];
  const currentCategory = category.find(
    (cat) => CATEGORY_KEYS[cat.id] === currentStepKey
  );

  const handleSelection = (option) => {
    toggleCategoryId(option.id);
  };

  const handleNext = () => {
    if (currentStep === STEP_KEYS.length - 1) {
      const allSelections = useOnboardingStore.getState().getAllSelections();
      submitMutation.mutate(allSelections);
    } else {
      useOnboardingStore.getState().setCurrentStep(currentStep + 1);
    }
  };

  if (!currentCategory) return null;

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-medium">세부 일정</h2>

      <div className="flex-1 px-6 overflow-y-auto">
        <div className="bg-white rounded-2xl p-2 shadow-sm space-y-1">
          {currentCategory.children.slice(0, -1).map((option, index) => (
            <div
              key={option.id}
              className="transition-all duration-200 ease-in-out"
            >
              <MyCheckButton
                value={option.name}
                checked={selectedCategoryIds.includes(option.id)}
                onChange={() => handleSelection(option)}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between p-6 mt-auto">
        <button
          onClick={() =>
            useOnboardingStore.getState().setCurrentStep(currentStep - 1)
          }
          className={`px-8 py-3 rounded-lg font-medium 
              ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400"
                  : "bg-red-50 text-gray-600"
              }`}
          disabled={currentStep === 0}
        >
          이 전
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-red-300 text-white rounded-lg font-medium"
        >
          {currentStep === STEP_KEYS.length - 1 ? "완 료" : "다 음"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingSelectionMolecule;
