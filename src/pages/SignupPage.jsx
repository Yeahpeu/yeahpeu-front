import SignupMolecule from "../molecules/SignupMolecule";

const SignupPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-center text-red-200 mt-2">
        회원가입
      </h2>
      <div className="flex flex-col items-center justify-center">
        <SignupMolecule />
      </div>
      <div>
        이미 계정이 있나요?
        <a href="/login" className="text-blue-500 ml-3 mt-6">
          로그인
        </a>
      </div>
    </div>
  );
};

export default SignupPage;
