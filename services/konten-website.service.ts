import { api } from "@/lib/axios";
import { ApiResponse, Konten } from "@/types/api";
import { AxiosError } from "axios";
import { cache } from "react";

export const getDataKonten = cache(
  async (token: string): Promise<ApiResponse<Konten[]>> => {
    try {
      const response = await api.get<ApiResponse<Konten>>(`/website`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw response.data;
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
  }
);

export const updateLogo = async (
  token: string,
  data: { idImage: string; name: string; file: File }
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("idImage", data.idImage);
    formData.append("name", data.name);
    formData.append("file", data.file);
    const response = await api.patch<ApiResponse>(`/website`, formData, {
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
