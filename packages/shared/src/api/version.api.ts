import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig
} from 'axios';

import HttpStatusCode from '../enums/http-status-code.enum';
import type { TApiPostResponse, TApiResponse, TErrorResponse, TFailedRequests, TOptional } from '../types';

const MAXIMUM_RETRY_UN_AUTHENTICATION = 1;

export class Version {
  private readonly instance: AxiosInstance;

  private failedRequests: TFailedRequests[] = [];

  private isTokenRefreshing = false;

  private readonly refreshTokenCount = new Map<TOptional<string>, number>();

  constructor(baseURL: string, config?: CreateAxiosDefaults) {
    const instance = axios.create({
      ...config,
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    this.setupInterceptorsTo(instance);
    this.instance = instance;
  }

  private readonly onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> =>
    config;

  private readonly onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);

    return Promise.reject(error);
  };

  private readonly onResponse = async <T>(response: AxiosResponse<TApiResponse<T>, AxiosRequestConfig>) => {
    const { url } = response.config;

    const isExistedRefreshTokenCount = this.refreshTokenCount.has(url);

    if (isExistedRefreshTokenCount) {
      this.refreshTokenCount.set(url, 0);
    }

    return response.data.result;
  };

  private readonly onResponseError = async (error: AxiosError) => {
    const originalRequest = error.config!;
    const { url } = originalRequest;
    const data = error.response?.data as TErrorResponse;

    if (data.statusCode !== HttpStatusCode.UNAUTHORIZED || url?.includes('/auth/signin')) {
      return Promise.reject(error);
    }

    if (this.isTokenRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedRequests.push({ resolve, reject, config: originalRequest, error });
      });
    }

    const existedRefreshTokenCount = this.refreshTokenCount.get(url) ?? 0;

    if (existedRefreshTokenCount >= MAXIMUM_RETRY_UN_AUTHENTICATION) {
      window.location.href = '/login';

      return Promise.reject(new Error('Maximum retry attempts exceeded. Redirecting to login.'));
    }

    this.refreshTokenCount.set(url, existedRefreshTokenCount + 1);
    this.isTokenRefreshing = true;

    try {
      const urlEndpoint = `/auth/refresh`;
      await axios.post(urlEndpoint, null, { withCredentials: true });

      this.failedRequests.forEach(({ resolve, reject, config }) => {
        this.instance(config)
          .then((resHttp) => resolve(resHttp))
          .catch((errorHttp) => reject(errorHttp));
      });
    } catch (err: unknown) {
      this.failedRequests.forEach(({ reject, error: errorFailedRequest }) => reject(errorFailedRequest));

      return Promise.reject(err);
    } finally {
      this.failedRequests = [];
      this.isTokenRefreshing = false;
    }

    if (originalRequest) {
      return this.instance(originalRequest);
    }

    return Promise.reject(new Error('Original request is undefined.'));
  };

  private setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    axiosInstance.interceptors.response.use(this.onResponse, this.onResponseError);

    return axiosInstance;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T, T>(url, config);
  }

  public async post<TData, TBody = object>(url: string, data?: TBody, config?: AxiosRequestConfig) {
    return this.instance.post<any, TApiPostResponse<TData>>(url, data, config);
  }

  public async put<TData, TBody = object>(url: string, data?: TBody, config?: AxiosRequestConfig) {
    return this.instance.put<any, TApiPostResponse<TData>>(url, data, config);
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}
