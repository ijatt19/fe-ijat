import { api } from "@/lib/axios";
import { ApiResponse, Konten } from "@/types/api";
import { cache } from "react";

export const getDataKonten = cache(
  async (token: string): Promise<ApiResponse | null> => {
    try {
      const response = await api.get<ApiResponse<Konten[]>>(`/website`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);

      return null;
    }
  }
);
