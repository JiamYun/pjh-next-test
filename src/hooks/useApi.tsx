import { useEffect } from "react";
import { useAuthToken } from "./useAuth";
import { api } from "@/services/index";

export const useApi = () => {
  const { getAuthHeader } = useAuthToken();

  useEffect(() => {
    const headers = getAuthHeader();
    // 모든 API 클라이언트의 헤더를 한번에 업데이트
    Object.values(api).forEach((client) => {
      client.updateHeaders(headers);
    });
  }, [getAuthHeader]);

  return api;
};
