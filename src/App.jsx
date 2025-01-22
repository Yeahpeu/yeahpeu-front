import "./App.css";
import { useState } from "react";
import MyButton from "./components/MyButton";
import MyCheckButton from "./components/MyCheckButton";
import MyConfirm from "./components/MyConfirm";
import MyRoleButton from "./components/MyRole";
import HomeProgressMolecule from "./molecules/HomeProgressMolecule";
import OnboardProgressMolecule from "./molecules/OnboardingProgressMolecule";
import MySearchBox from "./components/MySearchBar";

function App() {
  const marriagePercent = 77;
  const progressPercent = 25;
  const [selectedRole, setSelectedRole] = useState(null);

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
    </>
  );
}

export default App;
