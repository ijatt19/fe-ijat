import { api } from "@/lib/axios";
import {
  GantiPasswordValues,
  ProfilFormValues,
} from "@/lib/schemas/pengaturan";
import { ApiResponse, User } from "@/types/api";
import { AxiosError } from "axios";
import { cache } from "react";

export const getUserProfile = cache(
  async (token: string, id: string): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get<ApiResponse<User>>(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw response.data;
      }

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return err.response?.data;
      }
      return {
        success: false,
        statusCode: 500,
        message: "Terjadi kesalahan internal (Unknown Error)",
      };
    }
  },
);

export const updateUserProfile = async (
  token: string,
  id: number,
  values: ProfilFormValues,
): Promise<ApiResponse> => {
  try {
    const response = await api.patch<ApiResponse>(`/user/${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const gantiPassword = async (
  token: string,
  values: GantiPasswordValues,
): Promise<ApiResponse> => {
  try {
    const response = await api.patch<ApiResponse>("/user/ganti", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
