import useAuthStore from "../stores/authStore";
import MyInputWhite from "../components/common/MyInput-white";
import MyButton from "../components/common/MyButton";
import { useLoginMutation } from "../api/authAPI";

const LoginMolecule = () => {
  const loginMutation = useLoginMutation();
  const {
    email,
    password,
    isEmailValid,
    isPasswordValid,
    setEmail,
    setPassword,
  } = useAuthStore();
  const handleLogin = () => {
    const user = { email, password };
    loginMutation.mutate(user);
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg w-full max-w-sm mx-auto">
      <div className="text-left">
        <p className="mb-1 p-1">이메일</p>
        <MyInputWhite
          placeholder="이메일 주소"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid && email.length > 0 && (
          <p className="text-red-500 text-sm">이메일 형식을 유지해주세요.</p>
        )}
      </div>

      <div className="text-left">
        <p className="mb-1 p-1">비밀번호</p>
        <MyInputWhite
          placeholder="영문 대소문자 + 특수기호 포함 8글자 이상"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid && password.length > 0 && (
          <p className="text-red-500 text-sm mb-2">
            비밀번호는 8자 이상, 영문 대소문자 및 특수기호 1개 이상 포함해야
            합니다.
          </p>
        )}
      </div>

      <div className="mb-4">
        <MyButton
          disabled={!isEmailValid || !isPasswordValid}
          color={isEmailValid && isPasswordValid ? "abled" : "disabled"}
          onClick={handleLogin}
          value="로그인"
        />
      </div>
    </div>
  );
};

export default LoginMolecule;
