import MyTab from "../components/Buttons/MyTab";
import MyChatBox from "../components/Cards/MyChatbox";
import MyNav from "../molecules/NavMolecule";
import MyChatCard from "../components/Cards/MyChatCard";

const HomePage = () => {
  return (
    <>
      <div>홈!</div>
      <MyTab leftValue={"캘린더"} rightValue={"남은 일정"} />
      <MyChatBox
        owner={"others"}
        message={
          "테스트 중aㅁㄴㅇㄻㄴㄻㄴㅇㄹㄴㅁㅇㄹㄴㅇㄻㄹㄴㅁㅇㄹㄴㅁㅇㄹㄴㅇㅁㄹㄴㅇㄹㅁㅇㄴㄻㄴㅇㄹ"
        }
      />
      <MyChatCard
        roomTitle={"일이삼사오육칠팔구십일이삼사오"}
        currentMember={100}
        maxMember={500}
        imgSrc={"/src/assets/bride.png"}
      />
      <MyChatCard
        roomTitle={"일이삼사오육칠팔구십일이삼사오"}
        currentMember={100}
        maxMember={500}
        imgSrc={"/src/assets/bride.png"}
      />
      <MyNav />
    </>
  );
};

export default HomePage;
