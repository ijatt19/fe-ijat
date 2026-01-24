import { api } from "@/lib/axios";
import { CreateSupplierValues } from "@/lib/schemas/supplier";
import { ApiResponse } from "@/types/api";
import { AxiosError } from "axios";

export const createSupplier = async (
  payload: CreateSupplierValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.post<ApiResponse>("/supplier", payload, {
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
