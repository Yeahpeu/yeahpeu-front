import "./App.css";
import MyButton from "./components/MyButton";
import MyCheckButton from "./components/MyCheckButton";
import HomeProgressMolecule from "./molecules/HomeProgressMolecule";
import OnboardProgressMolecule from "./molecules/OnboardingProgressMolecule";

function App() {
  const marriagePercent = 77;
  const progressPercent = 25;

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
    </>
  );
}

export default App;
