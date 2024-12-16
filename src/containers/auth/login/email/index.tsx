"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import EmailLoginForm from "@/components/auth/emailLogin";
import appSlice from "@/store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import useCheckProfile from "@/hooks/useCheckProfile";

const EmailLoginContainer = () => {
  useCheckProfile();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fromApp = useAppSelector((state) => state.app.fromApp);
  const authTokens = useAppSelector((state) => state.app.authTokens);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirect = searchParams.get("redirect");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: redirect || "/",
      });

      if (result?.error) {
        console.error("로그인 에러:", result.error);
        return;
      }

      if (result?.ok) {
        const session = await getSession();

        if (session?.user) {
          dispatch(
            appSlice.actions.setAuthTokens({
              accessToken: session.accessToken as string,
              refreshToken: session.refreshToken as string,
            })
          );

          router.replace("/");
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      console.error("로그인 처리 중 오류 발생:", error);
    }
  };

  return (
    <EmailLoginForm
      email={email}
      password={password}
      onEmailChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value)
      }
      onPasswordChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value)
      }
      onSubmit={handleLogin}
    />
  );
};

export default EmailLoginContainer;
