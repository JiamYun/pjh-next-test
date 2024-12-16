"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/auth/signup";
import { useAppDispatch } from "@/store";
import { setEmailPassword } from "@/store/slices/singupSlice";

const SignupContainer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSignup = async () => {
    try {
      if (password !== passwordConfirm) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
        return;
      }
      setPasswordError("");
      dispatch(setEmailPassword({ email, password }));
      router.push("/signup/phone");
    } catch (error) {
      console.error("회원가입 처리 중 오류 발생:", error);
    }
  };

  return (
    <SignupForm
      email={email}
      password={password}
      passwordConfirm={passwordConfirm}
      passwordError={passwordError}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onPasswordConfirmChange={(e) => setPasswordConfirm(e.target.value)}
      onSubmit={handleSignup}
    />
  );
};

export default SignupContainer;
