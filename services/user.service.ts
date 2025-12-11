import { api } from "@/lib/axios";
import { ApiResponse, User } from "@/types/api";
import { AxiosError } from "axios";
import { cache } from "react";

export const getUserProfile = cache(
  async (token: string, id: string): Promise<User | null> => {
    try {
      const response = await api.get<ApiResponse<User>>(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data ?? null;
    } catch (error) {
      return null;
    }
  }
);
