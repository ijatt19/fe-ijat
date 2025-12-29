import { api } from "@/lib/axios";
import { ResponseResult } from "@/types/api";
import { AxiosError } from "axios";

export const logout = async (token: string): Promise<ResponseResult> => {
  try {
    const response = await api.patch<ResponseResult>(
      "/auth/logout",
      {}, // Body kosong (karena PATCH butuh body)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.success) {
      return response.data;
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return {
      success: false,
      statusCode: 500,
      message: "Terjadi kesalahan internal (Unknown Error)",
    };
  }
};
