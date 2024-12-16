import { colors } from "@/styles";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const AuthProvider = {
  EMAIL: "EMAIL",
  APPLE: "APPLE",
  GOOGLE: "GOOGLE",
  KAKAO: "KAKAO",
  NAVER: "NAVER",
} as const;

type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];
type SafeAreaProps = {
  size: {
    top: number;
    bottom: number;
  };
  color: {
    top: string;
    bottom: string;
  };
};
type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type LoginResponse = {
  id: AuthProvider;
  socialLoginId: string;
  profile?: {};
  accessToken: string;
  refreshToken: string;
};

type LoginRequest = {
  type: AuthProvider;
};

type AppRequest = {
  login: LoginRequest;
};

export type AppResponse = {
  appName?: "MyApp";
  login?: LoginResponse;
  safeArea: SafeAreaProps;
};

type AppInitialState = {
  fromApp: boolean;
  authTokens: AuthTokens;
  isNavigationBar: boolean;
  response: AppResponse;
};

export const appInitialState: AppInitialState = {
  fromApp: false,
  authTokens: {
    accessToken: "",
    refreshToken: "",
  },
  isNavigationBar: true,
  response: {
    safeArea: {
      size: {
        top: 0,
        bottom: 0,
      },
      color: {
        top: colors.white,
        bottom: colors.white,
      },
    },
  },
};

const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setIsNavigationBar(state, action: PayloadAction<boolean>) {
      state.isNavigationBar = action.payload;
    },
    setFromApp(state, action: PayloadAction<boolean>) {
      state.fromApp = action.payload;
    },
    setLoginResponse(state, action: PayloadAction<AppResponse["login"]>) {
      state.response.login = action.payload;
    },
    setSafeAreaSize(state, action: PayloadAction<SafeAreaProps["size"]>) {
      state.response.safeArea.size = action.payload;
    },
    setSafeAreaColor(state, action: PayloadAction<SafeAreaProps["color"]>) {
      state.response.safeArea.color = action.payload;
    },
    setAuthTokens(state, action: PayloadAction<AuthTokens>) {
      state.authTokens = action.payload;
    },
    onLoginRequest(_, action: PayloadAction<AppRequest["login"]>) {
      try {
        // @ts-ignore
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            login: action.payload,
          })
        );
      } catch (e) {
        console.error(e);
      }
    },
  },
  extraReducers: (builder) => {},
});

export default appSlice;
