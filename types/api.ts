type BaseResponse = {
  success: boolean;
  message: string;
};

export type SuccessWithData<T> = BaseResponse & {
  success: true;
  data: T;
};

export type SuccessWithoutData = BaseResponse & {
  success: true;
};

export type ErrorResponse = BaseResponse & {
  success: false;
  statusCode: number;
};

export type ApiResponse<T = never> =
  | SuccessWithData<T>
  | SuccessWithoutData
  | ErrorResponse;

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
  idImage: string;
  group: string;
  inputType: string;
}

export interface HeaderKonten {
  logo: Konten;
  navbars: Konten[];
}

export interface BodyKonten {
  sections: [{ image: Konten; title: Konten; description: Konten }];
}
export interface FooterKonten {
  sections: Konten[];
  maps: Konten[];
}
