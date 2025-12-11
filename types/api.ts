export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
}

export interface User {
  id: number;
  namaDepan: string;
  namaBelakang: string;
  username: string;
  email: string;
  noHp: string;
}
