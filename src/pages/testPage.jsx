import MyBudgetCard from "../components/Cards/MyBudgetCard";
import MyChatCard from "../components/Cards/MyChatCard";
import hamster from "../assets/hamster.png";
import MyWishCard from "../components/Cards/MyWishCard";

const TestPage = () => {
  return (
    <div>
      <div>
        <h1>TestPage</h1>
      </div>

      <MyBudgetCard total={1000000} expend={500000} />
      <MyChatCard
        roomTitle="Test"
        currentMember={10}
        maxMember={20}
        imgSrc={hamster}
        lastMessageText="Test"
        disabled={"pointer-events-none"}
      />
    </div>
  );
};

export default TestPage;
