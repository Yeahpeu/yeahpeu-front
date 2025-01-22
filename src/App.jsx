import "./App.css";
import { useState } from "react";
import MyButton from "./components/MyButton";
import MyCheckButton from "./components/MyCheckButton";
import MyConfirm from "./components/MyConfirm";
import MyRoleButton from "./components/MyRole";
import HomeProgressMolecule from "./molecules/HomeProgressMolecule";
import OnboardProgressMolecule from "./molecules/OnboardingProgressMolecule";
import MySearchBox from "./components/MySearchBar";
import MyAccordion from "./components/MyAccordion";
import MyCompleteButton from "./components/MyCompleteButton";

function App() {
  const marriagePercent = 77;
  const progressPercent = 25;
  // useState
  const [selectedRole, setSelectedRole] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [accordionStates, setAccordionStates] = useState({
    1: false,
    2: false,
  });

  const toggleComplete = () => {
    setIsCompleted((prev) => !prev);
  };

  const toggleAccordion = (accordionKey) => {
    setAccordionStates((prev) => ({
      ...prev,
      [accordionKey]: !prev[accordionKey],
    }));
  };

  const testValue = [
    { subTitle: "상견례", price: 10000 },
    { subTitle: "택일", price: 100000 },
    { subTitle: "웨딩홀 계약", price: 1000000 },
    { subTitle: "기타", price: 10000 },
    { subTitle: "기타", price: 10000 },
    { subTitle: "기타", price: 10000 },
    { subTitle: "기타", price: 10000 },
    { subTitle: "기타", price: 10000 },
    { subTitle: "기타", price: 10000 },
    { subTitle: "기타", price: 10000 },
    { subTitle: "기타", price: 10000 },
  ];

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
      <MyConfirm
        message={"테스트 해보는 중입니다"}
        optionLeft={"취소"}
        optionRight={"선택"}
      />
      <MyRoleButton selectedRole={selectedRole} onClick={setSelectedRole} />
      <MySearchBox value={""} onChange={"onChange"} />
      <MyAccordion
        title={"결혼식"}
        value={testValue}
        isOpen={accordionStates[1]}
        onClick={() => toggleAccordion(1)}
        percent={60}
      />
      <MyAccordion
        title={"결혼식테스트"}
        value={testValue}
        isOpen={accordionStates[2]}
        onClick={() => toggleAccordion(2)}
        percent={30}
      />
      <MyCompleteButton />
    </>
  );
}

export default App;
