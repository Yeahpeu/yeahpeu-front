import { create } from "zustand";

export const useAuthStore = create((set) => ({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  isEmailValid: false,
  isPasswordValid: true,
  isPasswordMatch: true,
  isVerified: false,
  isLoggedIn: false,

  setUsername: (username) => set({ username }),
  setEmail: (email) =>
    set({
      email,
      isEmailValid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email
      ),
    }),
  setPassword: (password) =>
    set({
      password,
      isPasswordValid: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
        password
      ),
    }),
  setConfirmPassword: (confirmPassword, password) =>
    set({ confirmPassword, isPasswordMatch: confirmPassword === password }),
  setTimer: (timer) => set({ timer }),
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // sendVerificationCode: async (email) => {
  //   if (!email) return alert("이메일을 입력하세요.");

  //   try {
  //     const response = await fetch("/auth/email-verification/request", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ emailAddress: email }),
  //     });

  //     if (!response.ok) throw new Error("인증번호 전송 실패");

  //     alert("인증번호가 전송되었습니다.");
  //     set({ timer: 180 });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // },

  // verifyCode: async (email, code) => {
  //   try {
  //     const response = await fetch("/auth/email-verification/confirm", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ emailAddress: email, verificationCode: code }),
  //     });

  //     if (!response.ok) throw new Error("인증번호가 올바르지 않습니다.");

  //     alert("이메일 인증 완료!");
  //     set({ isVerified: true, timer: 0 });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // },

  // login: async (email, password) => {
  //   if (!email || !password) {
  //     alert("이메일과 비밀번호를 입력하세요.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok)
  //       throw new Error("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");

  //     alert("로그인 성공!");
  //     set({ isLoggedIn: true });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // },
}));

export const useSignupStore = create((set) => {
  return {
    emailAddress: "",
    username: "",
    password: "",
    confirmPassword: "",
    authCode: "",
    isEmailValid: false,
    isPasswordValid: true,
    isPasswordMatch: true,
    isVerified: false,
    isSended: false,

    setEmailAddress: (emailAddress) =>
      set({
        emailAddress,
        isEmailValid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          emailAddress
        ),
      }),
    setUsername: (username) => set({ username }),
    setPassword: (password) =>
      set({
        password,
        // 영문, 숫자, 특수문자가 포함된 8글자 이상인지 검증
        isPasswordValid: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
          password
        ),
      }),
    setConfirmPassword: (confirmPassword, password) =>
      set({ confirmPassword, isPasswordMatch: confirmPassword === password }),
    setVerified: (isVerified) => set({ isVerified }),
    setAuthCode: (authCode) => set({ authCode }),
    setStatus: (isSended) => ({ isSended }),
  };
});
