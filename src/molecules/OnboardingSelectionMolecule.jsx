import React, { useState, useEffect } from "react";
import MyCheckButton from "../components/Buttons/MyCheckButton";
import MyAlert from "../components/Modals/MyAlert";
import useOnboardingStore from "../stores/onboardingStore";
import { useSubmitOnboardingMutation } from "../api/onboardingAPI";
import { STEP_KEYS, CATEGORY_KEYS } from "../components/onboardingSteps";
import { useNavigate } from "react-router-dom";

const OnboardingSelectionMolecule = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const {
    currentStep,
    getAllSelections,
    setCurrentStep,
    selectedCategoryIds,
    toggleCategoryId,
    category,
    resetSelections,
  } = useOnboardingStore();
  const submitMutation = useSubmitOnboardingMutation();
  const navigate = useNavigate();

  const currentStepKey = STEP_KEYS[currentStep];
  const currentCategory = category.find(
    (cat) => CATEGORY_KEYS[cat.id] === currentStepKey
  );

  const hasSelections = currentCategory?.children.some((option) =>
    selectedCategoryIds.includes(option.id)
  );

  const handleSelection = (option) => {
    toggleCategoryId(option.id);
  };

  const handleNext = () => {
    if (currentStep === STEP_KEYS.length - 1) {
      const allSelections = getAllSelections();

      submitMutation.mutate(allSelections, {
        onSuccess: () => {
          setAlertMessage("웨딩 준비를 시작해요!");
          setAlertType("success");

          resetSelections();
          setTimeout(() => {}, 100);
        },
        onError: () => {
          setAlertMessage("다시 시도해 주세요.");
          setAlertType("error");
        },
      });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    console.log("alertMessage:", alertMessage);
  }, [alertMessage]);

  const handleAlertConfirm = () => {
    if (alertType === "success") {
      navigate("/home");
    }
  };

  if (!currentCategory) return null;

  return (
    <>
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyAlert message={alertMessage} onConfirm={handleAlertConfirm} />
        </div>
      )}
      <div className="flex flex-col h-full">
        {/* <h2 className="font-medium">세부 일정</h2> */}

        <div className="flex-1  overflow-y-auto">
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
          {currentStep !== 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-red-50 text-gray-600 px-8 py-3 rounded-lg font-medium"
            >
              이 전
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!hasSelections}
            className={`px-8 py-3 rounded-lg font-medium ${
              currentStep === 0 || currentStep === STEP_KEYS.length - 1
                ? "ml-auto"
                : ""
            } ${
              hasSelections
                ? "bg-red-300 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {currentStep === STEP_KEYS.length - 1 ? "완 료" : "다 음"}
          </button>
        </div>
      </div>
    </>
  );
};

export default OnboardingSelectionMolecule;
