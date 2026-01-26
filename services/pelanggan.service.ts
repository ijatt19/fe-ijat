import { api } from "@/lib/axios";
import { CreatePelangganValues } from "@/lib/schemas/pelanggan";
import { ApiResponse } from "@/types/api";
import { AxiosError } from "axios";

export const createPelanggan = async (
  payload: CreatePelangganValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.post<ApiResponse>("/pelanggan", payload, {
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
