import { api } from "@/lib/axios";
import {
  CreateModalPriveValues,
  UpdateModalPriveValues,
} from "@/lib/schemas/modal-prive";
import { ApiResponse, ModalPrive } from "@/types/api";
import { AxiosError } from "axios";

export const createModalPrive = async (
  payload: CreateModalPriveValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.post<ApiResponse>("/modal-prive", payload, {
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

export const getAllModalPrive = async (
  token: string,
  jenis?: string,
  bulan?: string,
  tahun?: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.get<ApiResponse<ModalPrive[]>>("/modal-prive", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        jenis,
        bulan,
        tahun,
      },
    });

    if (!res.data.success) return res.data;

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;

    return {
      success: false,
      statusCode: 500,
      message: "Terjadi kesalahan internal",
    };
  }
};

export const updateModalPrive = async (
  id: number,
  payload: UpdateModalPriveValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.patch<ApiResponse>(`/modal-prive/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.success) return res.data;

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;

    return {
      statusCode: 500,
      success: false,
      message: "Terjadi kesalahan",
    };
  }
};

export const deleteModalPrive = async (
  id: number,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.delete<ApiResponse>(`/modal-prive/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.success) return res.data;

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) return error.response?.data;

    return {
      success: false,
      statusCode: 500,
      message: "Terjadi kesalahan sistem",
    };
  }
};
