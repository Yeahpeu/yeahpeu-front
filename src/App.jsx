import "./App.css";
import MyCreateChat from "./components/MyCreateChat";

function App() {
  return (
    <>
      <div className="">
        <MyCreateChat onCancel={"test"} onConfirm={"test"} />{" "}
      </div>
    </>
  );
}

export default App;
