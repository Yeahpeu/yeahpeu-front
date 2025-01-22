import "./App.css";
import MyButton from "./components/MyButton";
import MyCheckButton from "./components/MyCheckButton";
import HomeProgressMolecule from "./molecules/HomeProgressMolecule";
import OnboardProgressMolecule from "./molecules/OnboardingProgressMolecule";
import MyAlert from "./components/MyAlert";
import MyCompleteButton from "./components/MyCompleteButton";
import { useState } from "react";
import MyAccordion from "./components/MyAccordion";

function App() {
  const marriagePercent = 77;
  const progressPercent = 25;

  const [isCompleted, setIsCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleComplete = () => {
    setIsCompleted((prev) => !prev);
  };

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <HomeProgressMolecule marriagePercent={marriagePercent} />
      <br />
      <OnboardProgressMolecule
        subject={"weddingHall"}
        progressPercent={progressPercent}
      />
      <br />
      <MyCheckButton value={"결혼식장 정하기"} />
      <br />
      <MyButton value={"다음"} color={"abled"} />
      <MyButton value={"다음"} color={"disabled"} />
      <MyAlert message={"역할을 선택해주세요."} />
      <MyCompleteButton isCompleted={isCompleted} onClick={toggleComplete} />
      <MyAccordion />
    </>
  );
}

export default App;
