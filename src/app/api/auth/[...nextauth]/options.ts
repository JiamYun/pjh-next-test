/**
 * NextAuth 설정 파일
 * 소셜 로그인(Apple, Google, Naver, Kakao) 및 이메일 로그인 구현
 */

import type { NextAuthOptions, SocialLoginData } from "next-auth";
import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import AppleProvider from "next-auth/providers/apple";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

function generateAppleClientSecret() {
  const privateKeyPath = path.join(process.cwd(), "AuthKey_CRDY78R8HW.p8"); // 실제 p8 파일명으로 변경
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");

  const teamId = process.env.APPLE_TEAM_ID;
  const clientId = process.env.APPLE_CLIENT_ID;
  const keyId = process.env.APPLE_KEY_ID;

  const now = Math.floor(Date.now() / 1000);
  const expiration = now + 15777000; // 6개월 정도의 유효기간 (Apple 정책에 맞추어 조정 가능)

  const token = jwt.sign(
    {
      iss: teamId,
      iat: now,
      exp: expiration,
      aud: "https://appleid.apple.com",
      sub: clientId,
    },
    privateKey,
    {
      algorithm: "ES256",
      header: {
        alg: "ES256",
        kid: keyId,
      },
    }
  );

  console.log("token=====", token);

  return token;
}

export const authOptions: NextAuthOptions = {
  providers: [
    /**
     * Apple 로그인 프로바이더
     * - clientId: Apple Developer에서 발급받은 Service ID
     * - clientSecret: Apple Developer에서 생성한 secret key
     */
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID || "",
      // clientSecret: process.env.APPLE_CLIENT_SECRET || "",
      clientSecret: generateAppleClientSecret(),
      authorization: {
        params: {
          response_type: "code id_token",
          response_mode: "form_post",
          scope: "name email",
        },
      },
    }),

    /**
     * Google 로그인 프로바이더
     * - clientId: Google Cloud Console에서 발급받은 클라이언트 ID
     * - clientSecret: Google Cloud Console에서 발급받은 클라이언트 시크릿
     */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    /**
     * Naver 로그인 프로바이더
     * - clientId: Naver Developers에서 발급받은 클라이언트 ID
     * - clientSecret: Naver Developers에서 발급받은 클라이언트 시크릿
     */
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),

    /**
     * Kakao 로그인 프로바이더
     * - clientId: Kakao Developers에서 발급받은 REST API 키
     * - clientSecret: Kakao Developers에서 발급받은 Client Secret
     */
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),

    /**
     * 이메일 로그인 프로바이더
     * - 이메일과 비밀번호를 사용한 자체 로그인 구현
     * - authorize 함수에서 백엔드 API와 통신하여 인증 처리
     */
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (response.data) {
            // User 타입에 맞게 반환 객체 구조화
            return {
              id: response.data.profile.id.toString(), // id는 필수 필드입니다
              email: credentials.email,
              name: response.data.profile.name || null,
              image: response.data.profile.image || null,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
              profile: response.data.profile,
            };
          }
          return null;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "로그인 실패");
          }
          throw new Error("로그인 처리 중 오류가 발생했습니다.");
        }
      },
    }),
  ],

  /**
   * 커스텀 페이지 설정
   * - signIn: 커스텀 로그인 페��지 경로
   */
  pages: {
    signIn: "/",
  },

  callbacks: {
    /**
     * 소셜 로그인 콜백
     * - 소셜 로그인 성공 시 실행되는 콜백 함수
     * - 백엔드 API와 통신하여 사용자 정보 저장 및 토큰 발급
     * @param {Object} params - user, account 객체 포함
     * @returns {boolean} 로그인 성공 여부
     */
    async signIn({ user, account, credentials }) {
      try {
        // 이메일 로그인인 경우
        console.log("credentials=====", credentials);
        console.log("account=====", account);

        if (!account?.provider) {
          console.error("Provider information is missing");
          return false;
        }

        // 소셜 로그인 기본 데이터 구성
        let socialLoginData: SocialLoginData = {
          authType: account.provider.toUpperCase(),
          isNewAccount: !user.profile,
        };

        // 소셜 로그인 제공자별 데이터 구성
        switch (account?.provider) {
          case "apple":
            socialLoginData = {
              ...socialLoginData,
              socialLoginId: user.id,
              accessToken: account.id_token,
              name: user.name || "", // Apple은 최초 로그인시에만 이름 제공
            };
            break;
          case "google":
            socialLoginData = {
              ...socialLoginData,
              socialLoginId: user.id,
              accessToken: account.id_token,
            };
            break;
          case "naver":
            socialLoginData = {
              ...socialLoginData,
              socialLoginId: user.id,
              accessToken: account.access_token,
            };
            console.log("네이버 로그인 콜백", socialLoginData);
            break;
          case "kakao":
            socialLoginData = {
              ...socialLoginData,
              socialLoginId: user.id,
              accessToken: account.access_token,
            };
            console.log("카카오 로그인 콜백", socialLoginData);
            break;
          default:
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
              {
                email: credentials?.email,
                password: credentials?.password,
              }
            );

            if (response.data) {
              user.accessToken = response.data.accessToken;
              user.refreshToken = response.data.refreshToken;
              user.profile = response.data.profile;
              return true;
            }
            return false;
        }

        // 백엔드 소셜 로그인 API 호출
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/socialLogin`,
          socialLoginData
        );

        console.log("소셜 로그인 응답", response.data);

        if (response.data) {
          user.accessToken = response.data.accessToken;
          user.refreshToken = response.data.refreshToken;
          user.profile = response.data.profile;
          return true;
        }

        return false;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },

    /**
     * JWT 콜백
     * - JWT 토큰 생성/수정 시 실행되는 콜백 함수
     * - 사용자 정보와 토큰을 JWT에 저장
     */
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update" && session?.user?.profile) {
        token.profile = session.user.profile;
      }

      if (trigger === "signIn" && user?.refreshToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.profile = user.profile;
      }
      return token;
    },

    /**
     * 세션 콜백
     * - 클라이언트의 세션 데이터 설정
     * - JWT 토큰의 데이터를 세션에 복사
     */
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.user = {
          ...session.user,
          profile: token.profile,
        };
      }
      // console.log("session=====", session);
      return session;
    },

    async redirect({ url, baseUrl }) {
      // 1. 상대 경로 URL 처리 ("/profile" 같은 경로)
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`; // 예: "http://localhost:3000/profile"
      }
      // 2. 같은 도메인의 절대 경로 URL 처리
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      // 3. 그 외의 경우 기본 URL로 리다이렉트
      return baseUrl;
    },
  },
  cookies: {
    pkceCodeVerifier: {
      name: "__Secure-next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  /**
   * 세션 설정
   * - strategy: JWT 기반 세션 사용
   * - maxAge: 세션 유효 기간 (7일)
   */
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7일 (백엔드 refresh token과 동일)
  },
  debug: true,
  logger: {
    error(code, metadata) {
      console.error("Auth Error:", code, metadata);
    },
    warn(code) {
      console.warn("Auth Warning:", code);
    },
    debug(code, metadata) {
      console.log("Auth Debug:", code, metadata);
    },
  },
};

export default NextAuth(authOptions);
