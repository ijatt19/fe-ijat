import { api } from "@/lib/axios";
import {
  ApiResponse,
  BodyKonten,
  FooterKonten,
  HeaderKonten,
} from "@/types/api";
import { AxiosError } from "axios";

export const getDataHeaderKonten = async (
  token: string
): Promise<ApiResponse<HeaderKonten>> => {
  try {
    const response = await api.get<ApiResponse<HeaderKonten>>(
      `/website/header`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
};

export const getDataBodyKonten = async (
  token: string
): Promise<ApiResponse<BodyKonten>> => {
  try {
    const response = await api.get<ApiResponse<BodyKonten>>(`/website/body`, {
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
};

export const getDataFooterKonten = async (
  token: string
): Promise<ApiResponse<FooterKonten>> => {
  try {
    const response = await api.get<ApiResponse<FooterKonten>>(
      `/website/footer`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
};

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

export const updateImage = async (
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

export const updateKontenWebsite = async (
  data: { id: number; key: string; value: string }[],
  token: string
): Promise<ApiResponse> => {
  try {
    const response = await api.patch<ApiResponse>("/website/key", data, {
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
