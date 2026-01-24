import { api } from "@/lib/axios";
import {
  CreateSupplierValues,
  UpdateSupplierValues,
} from "@/lib/schemas/supplier";
import { ApiResponse, Supplier } from "@/types/api";
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

export const updateSupplier = async (
  id: number,
  payload: UpdateSupplierValues,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.patch<ApiResponse>(`/supplier/${id}`, payload, {
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

export const deleteSupplier = async (
  id: number,
  token: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.delete<ApiResponse>(`/supplier/${id}`, {
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

export const getAllSupplier = async (
  token: string,
  search?: string,
): Promise<ApiResponse> => {
  try {
    const res = await api.get<ApiResponse<Supplier[]>>("/supplier", {
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
