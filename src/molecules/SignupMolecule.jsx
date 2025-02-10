import { useSignupStore } from "../stores/authStore";
import MyInputPink from "../components/common/MyInput-pink";
import MyButton from "../components/common/MyButton";
import {
  useConfirmMutation,
  useSignupMutation,
  useVerifyMutation,
} from "../api/signupAPI";
import { useState } from "react";

const SignupMolecule = () => {
  const signupMutation = useSignupMutation();
  const verifyMutation = useVerifyMutation();
  const confirmMutation = useConfirmMutation();
  const {
    username,
    emailAddress,
    password,
    confirmPassword,
    authCode,
    isEmailValid,
    isPasswordValid,
    isPasswordMatch,
    isVerified,
    setUsername,
    setEmailAddress,
    setPassword,
    setConfirmPassword,
    setAuthCode,
  } = useSignupStore();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const handleSignup = () => {
    const userInfo = { emailAddress, username, password };
    signupMutation.mutate(userInfo);
  };
  const handleVerify = () => {
    verifyMutation.mutate(emailAddress);
    setIsTimerActive(true);
    setCountdown(30);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };
  const handleConfirm = () => {
    const authCodeSet = { emailAddress, authCode };
    confirmMutation.mutate(authCodeSet);
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
        <div className="flex-col mb-2 gap-2">
          <div className="mb-1">
            <MyInputPink
              placeholder="이메일 주소"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div>
            <MyButton
              value={isTimerActive ? `재전송 ${countdown}초` : "인증번호 전송"}
              color={isVerified || isTimerActive ? "disabled" : "abled"}
              disabled={isVerified || isTimerActive}
              onClick={handleVerify}
            />
            {!isEmailValid && emailAddress.length > 0 && (
              <p className="text-red-500 text-sm">
                올바른 이메일 형식이 아닙니다.
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <MyInputPink
            placeholder="인증번호"
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            disabled={isVerified}
          />
          <div className="w-1/2">
            <MyButton
              value={isVerified ? "인증완료" : "인증"}
              color={isVerified ? "disabled" : "abled"}
              disabled={isVerified}
              onClick={handleConfirm}
            />
          </div>
        </div>
      </div>

      <div className="text-left">
        <p className="mb-1 p-1">비밀번호</p>
        <MyInputPink
          placeholder="대소문자 + 특수기호 포함 8글자 이상"
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
          color={
            !username || !isVerified || !isPasswordValid || !isPasswordMatch
              ? "disabled"
              : "abled"
          }
          onClick={handleSignup}
          value="회원 가입하기"
        />
      </div>
    </div>
  );
};

export default SignupMolecule;
