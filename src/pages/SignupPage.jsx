import SignupMolecule from "../molecules/SignupMolecule";
import { Link } from "react-router-dom";
const SignupPage = () => {
  return (
    <div className="">
      <h2 className="text-xl font-bold text-center text-red-200 px-8 py-4">
        회원가입
      </h2>
      <div className="flex flex-col items-center justify-center px-8">
        <SignupMolecule />
      </div>
      <div>
        이미 계정이 있나요?
        <Link to="/login" className="text-blue-500 ml-3 mt-6">
          로그인
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
