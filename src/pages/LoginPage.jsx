import HeaderMolecule from "../molecules/HeaderMolecule";
import LoginMolecule from "../molecules/LoginMolecule";
import SocialMoleCule from "../molecules/SocialMolecule";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-[90vh]  px-8 py-4">
      <HeaderMolecule />
      <div className="flex-grow flex flex-col items-center justify-center">
        <LoginMolecule />
        <div className="my-3">or</div>
        <SocialMoleCule />
        <div className="my-3">
          계정이 없으신가요{" "}
          <a href="/signup" className="text-blue-500 ml-3">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
