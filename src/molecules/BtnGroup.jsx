import Btn from "../components/Btn";
import ForgetPassword from "../components/ForgetPassword";

const BtnGroup = ({ onClick, width }) => {
  return (
    <div>
      <Btn width={width} onClick={onClick} />
      <ForgetPassword />
    </div>
  );
};

export default BtnGroup;
