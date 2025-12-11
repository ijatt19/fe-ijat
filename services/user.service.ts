import { api } from "@/lib/axios";
import { ApiErrorResponse, ApiResponse, User } from "@/types/api";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUserProfile = cache(
  async (token: string, id: string): Promise<ApiResponse | null> => {
    try {
      const response = await api.get<ApiResponse<User>>(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data ?? null;
    } catch (err) {
      if (err instanceof AxiosError) {
        return err.response?.data;
      }

      return null;
    }
  }
);
