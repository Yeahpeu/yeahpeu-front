import LoginMolecule from "../molecules/LoginMolecule";
import SocialMoleCule from "../molecules/SocialMolecule";

const LoginPage = () => {
  return (
    <>
      <LoginMolecule />
      <div>or</div>
      <SocialMoleCule />
      <div>
        {" "}
        계정이 없으신가요 <a href="">회원가입</a>{" "}
      </div>
    </>
  );
};

export default LoginPage;
