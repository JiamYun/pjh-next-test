import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store";

export const useAuthToken = () => {
  const { data: session } = useSession();
  const fromApp = useAppSelector((state) => state.app.fromApp);
  const tokenValue = useAppSelector((state) => state.app.authTokens);

  const getAuthHeader = (): Record<string, string> => {
    const token = fromApp ? tokenValue?.refreshToken : session?.refreshToken;

    return {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      "x-from-app": fromApp ? "true" : "false",
    };
  };

  return {
    getAuthHeader,
    token: fromApp ? tokenValue?.refreshToken : session?.refreshToken,
    isAuthenticated: Boolean(
      fromApp ? tokenValue?.refreshToken : session?.refreshToken
    ),
  };
};
