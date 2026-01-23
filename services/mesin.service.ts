import { api } from "@/lib/axios";
import { CreateMesinValues, UpdateMesinValues } from "@/lib/schemas/mesin";
import { ApiResponse, Mesin } from "@/types/api";
import { AxiosError } from "axios";

export const createMesin = async (
  payload: CreateMesinValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.post<ApiResponse>("/mesin", payload, {
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

export const getAllMesin = async (
  token: string,
  search?: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.get<ApiResponse<Mesin[]>>("/mesin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: search ? { search: search } : undefined,
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

export const updateMesin = async (
  id: number,
  payload: UpdateMesinValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.patch<ApiResponse>(`/mesin/${id}`, payload, {
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

export const deleteMesin = async (
  id: number,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.delete<ApiResponse>(`/mesin/${id}`, {
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
