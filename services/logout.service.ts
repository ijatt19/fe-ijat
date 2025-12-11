import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export const logout = async (token: string): Promise<ApiResponse | null> => {
  try {
    const response = await api.patch<ApiResponse>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
