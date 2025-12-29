// export interface ApiResponse<T = any> {
//   success: boolean;
//   message: string;
//   data?: T;
// }

// export interface ApiErrorResponse {
//   succes: boolean;
//   message: string;
// }

export type SuccessResponse<T = void> = {
  success: true;
  message: string;
  data?: T;
};

export type ErrorResponse = {
  success: false;
  message: string;
  statusCode: number;
};

export type ResponseResult<T = void> = SuccessResponse<T> | ErrorResponse;

export interface User {
  id: number;
  namaDepan: string;
  namaBelakang: string;
  username: string;
  email: string;
  noHp: string;
}

export interface Konten {
  id: number;
  key: string;
  value: string;
  group: string;
  inputType: string;
}
