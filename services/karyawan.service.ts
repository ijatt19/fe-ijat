import { api } from "@/lib/axios";
import { CreateKaryawanValues } from "@/lib/schemas/karyawan";
import { ApiResponse } from "@/types/api";
import { AxiosError } from "axios";

export const createKaryawan = async (
  payload: CreateKaryawanValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.post<ApiResponse>("/karyawan", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.success) return res.data;

    return res.data;
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
