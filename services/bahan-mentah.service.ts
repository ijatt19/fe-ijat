import { api } from "@/lib/axios";
import {
  CreateBahanMentahValues,
  UpdateBahanMentahValues,
} from "@/lib/schemas/bahan-mentah";
import { ApiResponse, BahanMentah } from "@/types/api";
import { AxiosError } from "axios";

export const createBahanMentah = async (
  payload: CreateBahanMentahValues,
  token: string,
) => {
  try {
    const response = await api.post<ApiResponse<BahanMentah>>(
      "/bahan-mentah",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data.success) throw response.data;

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

export const getAllBahanMentah = async (
  token: string,
  search?: string,
): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse<BahanMentah[]>>(
      "/bahan-mentah",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: search ? { search: search } : undefined,
      },
    );

    if (!response.data.success) throw response.data;

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

export const updateBahanMentah = async (
  id: number,
  payload: UpdateBahanMentahValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const response = await api.patch<ApiResponse>(
      `/bahan-mentah/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data.success) throw response.data;

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

export const deleteOneBahanMentah = async (
  id: number,
  token: string,
): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(`/bahan-mentah/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) throw response.data;

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
