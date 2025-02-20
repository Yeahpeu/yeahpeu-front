import { useAuthStore } from "../stores/authStore";
import MyInputWhite from "../components/common/MyInput-white";
import MyButton from "../components/common/MyButton";
import { useLoginMutation } from "../api/authAPI";
import { useState } from "react";
import MyAlert from "../components/Modals/MyAlert";

const LoginMolecule = () => {
  const [alertMessage, setAlertMessage] = useState("");
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
    loginMutation.mutate(user, {
      onError: (error) => {
        setAlertMessage(error.response?.data?.message);
      },
    });
  };

  return (
    <div className="flex flex-col p-4 rounded-lg w-full max-w-sm mx-auto">
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <MyAlert
            message={
              <div style={{ whiteSpace: "pre-line" }}>{alertMessage}</div>
            }
            onConfirm={() => setAlertMessage("")}
          />
        </div>
      )}
      <div className="text-left mb-2">
        <p className="p-1">이메일</p>
        <MyInputWhite
          placeholder="이메일 주소"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p
          className={`text-red-500 text-xs ml-2 transition-opacity duration-300 ${
            !isEmailValid && email.length > 0
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          이메일 형식을 유지해주세요.
        </p>
      </div>

      <div className="text-left">
        <p className=" p-1">비밀번호</p>
        <MyInputWhite
          placeholder="영문 + 숫자 + 특수기호 포함 8글자 이상"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={50}
        />
        <p
          className={`text-red-500 text-xs transition-opacity duration-300 ${
            !isPasswordValid && password.length > 0
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          비밀번호는 8자 이상, 영문, 숫자 및 특수기호 1개 이상 포함해야 합니다.
        </p>
      </div>

      <div className="mb-3">
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
