import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

interface Headers {
  Authorization?: string;
  "Content-Type": string;
  "x-from-app": string;
}

export class BaseApiClient {
  protected client: AxiosInstance;
  private static token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        "x-from-app": "false",
      },
      // CORS 설정
      withCredentials: true,
    });

    // 요청 인터셉터 설정
    // this.client.interceptors.request.use(
    //   async (config) => {
    //     // 세션에서 토큰 가져오기
    //     const session = await getSession();
    //     if (session?.refreshToken) {
    //       config.headers.Authorization = `Bearer ${session.refreshToken}`;
    //     }
    //     return config;
    //   },
    //   (error) => Promise.reject(error)
    // );
    this.client.interceptors.request.use(async (config) => {
      // 저장된 토큰이 있으면 사용
      if (BaseApiClient.token) {
        config.headers.Authorization = `Bearer ${BaseApiClient.token}`;
        return config;
      }

      // 웹 세션에서 토큰 가져오기
      const session = await getSession();
      if (session?.refreshToken) {
        config.headers.Authorization = `Bearer ${session.refreshToken}`;
      }
      return config;
    });

    // 응답 인터셉터 설정
    // this.client.interceptors.response.use(
    //   (response) => response.data,
    //   async (error) => {
    //     // 에러 처리 로직
    //     if (error.response?.status === 401) {
    //       // 토큰 만료 등의 인증 에러 처리
    //       // 필요한 경우 토큰 갱신 로직 추가
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  }

  // 헤더 업데이트가 필요한 경우를 위한 메서드
  updateHeaders(headers: Partial<Headers>) {
    Object.assign(this.client.defaults.headers.common, headers);
  }
}
