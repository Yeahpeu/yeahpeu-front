import { useState } from "react";
import MyInputWhite from "../components/common/MyInput-white";
import MyButton from "../components/common/MyButton";

const LoginMolecule = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // 이메일 유효성 검사
  const validateEmail = (value) => {
    const rule = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return rule.test(value);
  };

  // 비밀번호 유효성 검사 (대소문자 + 특수기호 1개 이상 + 최소 8자)
  const validatePassword = (value) => {
    const rule = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;
    return rule.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  //zustand 사용하면 변경해야 하는 부분 ======================
  const handleLogin = () => {
    if (isEmailValid && isPasswordValid) {
      alert("로그인 성공!");
    } else {
      alert("입력값을 다시 확인해주세요.");
    }
  };
  // ========================================================

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg w-full max-w-sm mx-auto">
      <MyInputWhite
        placeholder="이메일 주소"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      {!isEmailValid && email.length > 0 && (
        <p className="text-red-500 text-sm">올바른 이메일 형식이 아닙니다.</p>
      )}

      <MyInputWhite
        placeholder="비밀번호 (영문 대소문자 + 특수기호 포함)"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {!isPasswordValid && password.length > 0 && (
        <p className="text-red-500 text-sm">
          비밀번호는 8자 이상, 영문 대소문자 및 특수기호 1개 이상 포함해야
          합니다.
        </p>
      )}

      <MyButton
        disabled={!isEmailValid || !isPasswordValid}
        color={isEmailValid && isPasswordValid ? "abled" : "disabled"}
        onClick={handleLogin}
        value="로그인"
      />
    </div>
  );
};

export default LoginMolecule;
