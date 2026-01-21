import { api } from "@/lib/axios";
import {
  TambahBarangJadiValues,
  UpdateBarangJadiValues,
} from "@/lib/schemas/barang-jadi";
import { ApiResponse, BarangJadi } from "@/types/api";
import { AxiosError } from "axios";

export const createBarangJadi = async (
  payload: TambahBarangJadiValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>("/barang-jadi", payload, {
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

export const updateBarangJadi = async (
  id: number,
  payload: UpdateBarangJadiValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const response = await api.patch<ApiResponse>(
      `/barang-jadi/${id}`,
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

export const getAllBarangJadi = async (
  token: string,
  search?: string,
): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse<BarangJadi[]>>("/barang-jadi", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: search ? { search: search } : undefined,
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

export const deleteOneBarangJadi = async (
  id: number,
  token: string,
): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(`/barang-jadi/${id}`, {
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
