import { useState } from "react";
import useAuthStore from "../stores/authStore";
import MyInputPink from "../components/common/MyInput-pink";
import MyButton from "../components/common/MyButton";

const SignupMolecule = () => {
  const {
    username,
    email,
    password,
    confirmPassword,
    isEmailValid,
    isPasswordValid,
    isPasswordMatch,
    isVerified,
    timer,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    sendVerificationCode,
    verifyCode,
  } = useAuthStore();

  const [verificationCode, setVerificationCode] = useState("");

  const handleSignup = () => {
    if (!username) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    if (!isPasswordValid || !isPasswordMatch) {
      alert("비밀번호를 확인해주세요.");
      return;
    }
    alert("회원가입 성공!");
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg w-full max-w-sm mx-auto">
      <div className="text-left">
        <p className="mb-1 p-1">이름</p>
        <MyInputPink
          placeholder="이름"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="text-left">
        <p className="mb-1 p-1">이메일</p>
        <div className="flex space-x-2 mb-2">
          <MyInputPink
            placeholder="이메일 주소"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyButton
            value={timer > 0 ? `재전송 (${timer}s)` : "인증번호 전송"}
            color="abled"
            disabled={timer > 0}
            onClick={() => sendVerificationCode(email)}
          />
          {!isEmailValid && email.length > 0 && (
            <p className="text-red-500 text-sm">
              올바른 이메일 형식이 아닙니다.
            </p>
          )}
        </div>

        <div className="flex space-x-2">
          <MyInputPink
            placeholder="인증번호"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            disabled={timer === 0 || isVerified}
          />
          <MyButton
            value="인증"
            color="abled"
            disabled={timer === 0 || isVerified}
            onClick={() => verifyCode(email, verificationCode)}
          />
        </div>
      </div>

      <div className="text-left">
        <p className="mb-1 p-1">비밀번호</p>
        <MyInputPink
          placeholder="영문 대소문자 + 특수기호 포함 8글자 이상"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid && password.length > 0 && (
          <p className="text-red-500 text-sm">
            비밀번호는 8자 이상, 영문 대소문자 및 특수기호 포함해야 합니다.
          </p>
        )}
      </div>

      <div className="text-left">
        <p className="mb-1 p-1">비밀번호 확인</p>
        <MyInputPink
          placeholder="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value, password)}
        />
        {!isPasswordMatch && confirmPassword.length > 0 && (
          <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>
        )}
      </div>

      <div className="mt-6">
        <MyButton
          disabled={
            !username || !isVerified || !isPasswordValid || !isPasswordMatch
          }
          color="abled"
          onClick={handleSignup}
          value="회원 가입하기"
        />
      </div>
    </div>
  );
};

export default SignupMolecule;
