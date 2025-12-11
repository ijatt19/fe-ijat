import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export const logout = async (token: string): Promise<ApiResponse | null> => {
  const response = await api.patch<ApiResponse>(
    "/auth/logout",
    {}, // Body kosong (karena PATCH butuh body)
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
