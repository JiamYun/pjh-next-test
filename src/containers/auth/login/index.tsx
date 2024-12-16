"use client";

import { Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";
import { Body3 } from "@/atoms";
import { Icon } from "@/components";
import { getSession, signIn, useSession } from "next-auth/react";
import Image from "@/atoms/Image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "@/store";
import appSlice, { AuthProvider } from "@/store/slices/appSlice";
import useCheckProfile from "@/hooks/useCheckProfile";
import { useSelector } from "react-redux";

const LoginContainer = () => {
  useCheckProfile();
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") ?? "/";
  const redirectUrl = searchParams?.get("redirect");
  const fromApp = useSelector((state: RootState) => state.app.fromApp);

  // useEffect(() => {
  //   if (status === "authenticated" && session) {
  //     if (redirectUrl) {
  //       window.history.replaceState(null, "", redirectUrl);
  //       router.replace(redirectUrl);
  //     } else {
  //       window.history.replaceState(null, "", callbackUrl);
  //       router.replace(callbackUrl);
  //     }
  //   }
  // }, [status, session, router, callbackUrl, redirectUrl]);

  const handleSocialLogin = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: redirectUrl || callbackUrl || "/",
      });

      if (result?.error) {
        console.error("로그인 에러:", result.error);
        return;
      }

      // NextAuth 세션이 완전히 설정될 때까지 대기
      let session = null;
      let attempts = 0;
      const maxAttempts = 10;

      while (!session?.user && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        session = await getSession();
        attempts++;
      }

      if (!session?.user) {
        console.error("세션 로드 실패");
        return;
      }

      console.log("session", session);

      if (session.user.profile === null || !session.user.profile) {
        router.push("/signup/phone");
      } else if (session.user.profile && !session.user.profile.agreement) {
        router.push("/signup/profilesetup");
      } else {
        router.push(redirectUrl || callbackUrl || "/");
      }
    } catch (error) {
      console.error("소셜 로그인 에러:", error);
    }
  };

  const handleEmailLogin = async () => {
    router.push("/login/email");
  };

  // 로딩 중이거나 이미 인증된 상태면 컨텐츠를 숨김
  if (status === "loading" || status === "authenticated") {
    return null; // 또는 로딩 스피너 표시
  }

  return (
    <FrameScreen>
      <Frame col w="100%" h="100%" alignment="center" gap={40}>
        {/* 로고 영역 */}
        <Frame col w="100%" alignment="center" gap={12} pt={60}>
          <Image
            src="/images/main-logo.png"
            alt="로고"
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: 1.6525 / 1,
            }}
          />
        </Frame>

        {/* 소셜 로그인 버튼 영역 */}
        <Frame col w="100%" gap={20} px={20} pt={40} alignment="center">
          <Body3 fontColor="#666">아래 계정으로 시작</Body3>
          <Frame row w="100%" alignment="center" gap={20}>
            <Frame
              alignment="center"
              onClick={() => {
                handleSocialLogin("apple");
                if (fromApp) {
                  dispatch(
                    appSlice.actions.onLoginRequest({
                      type: AuthProvider.APPLE,
                    })
                  );
                }
              }}
            >
              {/* <Icon type="auth" name="google" size={28} /> */}
              애플
            </Frame>
            <Frame
              alignment="center"
              onClick={() => {
                handleSocialLogin("google");
                if (fromApp) {
                  dispatch(
                    appSlice.actions.onLoginRequest({
                      type: AuthProvider.GOOGLE,
                    })
                  );
                }
              }}
            >
              {/* <Icon type="auth" name="google" size={28} /> */}
              구글
            </Frame>
            <Frame
              alignment="center"
              onClick={() => {
                handleSocialLogin("naver");
                if (fromApp) {
                  dispatch(
                    appSlice.actions.onLoginRequest({
                      type: AuthProvider.NAVER,
                    })
                  );
                }
              }}
            >
              {/* <Icon type="auth" name="naver" size={28} /> */}
              네이버
            </Frame>
            <Frame
              alignment="center"
              onClick={() => {
                handleSocialLogin("kakao");
                if (fromApp) {
                  dispatch(
                    appSlice.actions.onLoginRequest({
                      type: AuthProvider.KAKAO,
                    })
                  );
                }
              }}
            >
              {/* <Icon type="auth" name="kakao" size={28} /> */}
              카카오
            </Frame>
            <Frame alignment="center" onClick={handleEmailLogin}>
              {/* <Icon type="auth" name="email" size={28} /> */}
              이메일
            </Frame>
          </Frame>
        </Frame>
      </Frame>
    </FrameScreen>
  );
};

export default LoginContainer;
