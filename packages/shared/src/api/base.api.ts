import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig
} from 'axios';

import HttpStatusCode from '../enums/http-status-code.enum';
import type { TApiPostResponse, TApiResponse, TFailedRequests, TOptional } from '../types';

const MAXIMUM_RETRY_UN_AUTHENTICATION = 1;

export abstract class BaseInstance {
  private readonly instance: AxiosInstance;

  private readonly config: CreateAxiosDefaults;

  private failedRequests: TFailedRequests[] = [];

  private isTokenRefreshing = false;

  private readonly refreshTokenCount = new Map<TOptional<string>, number>();

  constructor(config: CreateAxiosDefaults) {
    const instance = axios.create({
      ...config,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.config = config;
    this.setupInterceptors(instance);
    this.instance = instance;
  }

  private readonly onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    // Add config by overriding this method by platforms
    const configByPlatform = await this.customizeConfigByPlatform();

    return { ...config, ...configByPlatform };
  };

  private readonly onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);

    return Promise.reject(error);
  };

  private readonly onResponse = async <T>(response: AxiosResponse<TApiResponse<T>, AxiosRequestConfig>) => {
    const { url } = response.config;

    const isExistedRefreshTokenCount = this.refreshTokenCount.has(url);

    if (isExistedRefreshTokenCount) {
      this.refreshTokenCount.delete(url);
    }

    return response.data.result;
  };

  private readonly onResponseError = async (error: AxiosError) => {
    const originalRequest = error.config!;
    const url = error.request.responseURL;
    const status = error.response?.status;

    if (status !== HttpStatusCode.UNAUTHORIZED || error.config?.url === '/auth/signin') {
      return Promise.reject(error);
    }

    if (this.isTokenRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedRequests.push({
          resolve,
          reject,
          config: originalRequest,
          error
        });
      });
    }

    const existedRefreshTokenCount = this.refreshTokenCount.get(url) ?? 0;

    if (existedRefreshTokenCount >= MAXIMUM_RETRY_UN_AUTHENTICATION) {
      this.redirect('/login');

      return Promise.reject(new Error('Maximum retry attempts exceeded. Redirecting to login.'));
    }

    this.refreshTokenCount.set(url, existedRefreshTokenCount + 1);
    this.isTokenRefreshing = true;

    try {
      await this.refreshToken();

      this.failedRequests.forEach(({ resolve, reject, config }) => {
        this.instance(config)
          .then((resHttp) => resolve(resHttp))
          .catch((errorHttp) => reject(errorHttp));
      });
    } catch (err: unknown) {
      this.failedRequests.forEach(({ reject, error: errorFailedRequest }) => reject(errorFailedRequest));

      this.redirect('/login');

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

  /**
   * Setup interceptors
   * @param axiosInstance
   * @returns
   */
  private setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    axiosInstance.interceptors.response.use(this.onResponse, this.onResponseError);

    return axiosInstance;
  }

  /**
   * Extended class will defined this function based on their platform
   * @param path
   */
  abstract redirect(path: string): void;

  /**
   * Custom config
   * @param path
   */
  abstract customizeConfigByPlatform(): Promise<any>;

  /**
   * Custom config
   * @param path
   */
  abstract refreshToken(): Promise<void>;

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

  public root() {
    return this.instance;
  }
}

export { axios, AxiosResponse, InternalAxiosRequestConfig };
