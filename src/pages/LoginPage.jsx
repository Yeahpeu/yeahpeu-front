import LoginMolecule from "../molecules/LoginMolecule";
import SocialMoleCule from "../molecules/SocialMolecule";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoginMolecule />
      <div className="mb-3">or</div>
      <SocialMoleCule />
      <div>
        계정이 없으신가요{" "}
        <a href="" className="text-blue-500 ml-1">
          회원가입
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
