import { useSignupStore } from "../stores/authStore";
import MyInputPink from "../components/common/MyInput-pink";
import MyButton from "../components/common/MyButton";
import {
  useConfirmMutation,
  useSignupMutation,
  useVerifyMutation,
} from "../api/signupAPI";
import { useState } from "react";
import MyAlert from "../components/Modals/MyAlert";

const SIGNUP_DURATION = 180;

const SignupMolecule = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
  const [countdown, setCountdown] = useState(0);

  const verifyMutation = useVerifyMutation(
    setErrorMessage,
    setShowAlert,
    setIsTimerActive,
    setCountdown
  );
  const confirmMutation = useConfirmMutation(setErrorMessage, setShowAlert);
  const signupMutation = useSignupMutation(setErrorMessage, setShowAlert);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}분 ${secs < 10 ? `0${secs}` : secs}초`;
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setErrorMessage("");
    setIsTimerActive(false);
    setCountdown(0);
  };

  const handleVerify = () => {
    verifyMutation.mutate(emailAddress);
    const startTime = Date.now();

    setIsTimerActive(true);
    setCountdown(SIGNUP_DURATION);

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = SIGNUP_DURATION - elapsed;
      if (remaining <= 0) {
        clearInterval(timer);
        setCountdown(0);
        setIsTimerActive(false);
      } else {
        setCountdown(remaining);
      }
    }, 1000);
  };

  const handleConfirm = () => {
    const authCodeSet = { emailAddress, authCode };
    confirmMutation.mutate(authCodeSet);
  };

  const handleSignup = () => {
    const userInfo = { emailAddress, username, password };
    signupMutation.mutate(userInfo);
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg w-full max-w-sm mx-auto">
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyAlert message={errorMessage} onConfirm={handleCloseAlert} />
        </div>
      )}

      <div className="text-left">
        <p className="mb-1 p-1">이름</p>
        <MyInputPink
          placeholder="이름"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={5}
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
              disabled={isVerified}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          {!isVerified && (
            <div>
              <MyButton
                value={
                  isTimerActive
                    ? `재전송 ${formatTime(countdown)}`
                    : "인증번호 전송"
                }
                color={isTimerActive || !isEmailValid ? "disabled" : "abled"}
                disabled={isTimerActive || !isEmailValid}
                onClick={handleVerify}
              />
            </div>
          )}
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
          placeholder="영문 + 숫자 + 기호 포함 8글자 이상"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={50}
        />
        {!isPasswordValid && password.length > 0 && (
          <p className="text-red-500 text-sm">
            8자 이상, 영문, 숫자, 특수기호를 포함하세요.
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
          maxLength={50}
        />
        {!isPasswordMatch && confirmPassword.length > 0 && (
          <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>
        )}
      </div>

      <div className="mt-4">
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
