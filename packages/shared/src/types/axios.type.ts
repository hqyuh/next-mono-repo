import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type TFunction = (key: string, value?: object) => string;
export type TNullable<T> = T | null;
export type TOptional<T> = T | undefined;

export type TApiPostResponse<T> = {
  inserted: number;
  raw: T;
};

export type TApiResponse<T> = {
  timestamp: string;
  result: T;
  statusCode: number;
};

export type TPaginationResponse<TData, TMeta> = {
  data: TData[];
  metadata: TMeta;
};

export type TErrorResponse = {
  message: string;
  statusCode: number;
};

export type TFailedRequests = {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
};
