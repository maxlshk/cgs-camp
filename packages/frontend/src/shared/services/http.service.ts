import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosError,
	InternalAxiosRequestConfig,
} from 'axios';
import { STORAGE_KEYS, UESR_API_KEYS } from '~shared/keys';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

interface ErrorResponse {
	message: string;
}

export class HttpService {
	private axiosInstance: AxiosInstance;

	constructor(baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
		});

		this.axiosInstance.interceptors.request.use(
			(config) => {
				const accessToken = localStorage.getItem(
					STORAGE_KEYS.ACCESS_TOKEN,
				);
				if (accessToken) {
					config.headers['Authorization'] = `Bearer ${accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error),
		);

		this.axiosInstance.interceptors.response.use(
			(response) => response,
			async (error: AxiosError) => {
				const originalRequest =
					error.config as ExtendedAxiosRequestConfig;
				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					try {
						const refreshToken = localStorage.getItem(
							STORAGE_KEYS.REFRESH_TOKEN,
						);

						if (!refreshToken) {
							window.location.href = '/login';
							return Promise.reject(error);
						}

						const response = await axios.post(
							`${this.axiosInstance.defaults.baseURL}${UESR_API_KEYS.REFRESH_TOKEN}`,
							{ refreshToken },
						);

						const {
							accessToken: newAccessToken,
							refreshToken: newRefreshToken,
						} = response.data;

						localStorage.setItem(
							STORAGE_KEYS.ACCESS_TOKEN,
							newAccessToken,
						);
						localStorage.setItem(
							STORAGE_KEYS.REFRESH_TOKEN,
							newRefreshToken,
						);

						if (originalRequest.headers) {
							originalRequest.headers['Authorization'] =
								`Bearer ${newAccessToken}`;
						}

						return this.axiosInstance(originalRequest);
					} catch (refreshError) {
						window.location.href = '/login';
						return Promise.reject(refreshError);
					}
				}
				return Promise.reject(this.handleRequestError(error));
			},
		);
	}

	private handleRequestError(error: unknown): Error {
		if (axios.isAxiosError(error)) {
			const errorMessage =
				(error.response?.data as ErrorResponse)?.message ||
				error.message;
			return new Error(errorMessage);
		}
		return error instanceof Error
			? error
			: new Error('An unknown error occurred');
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const response = await this.axiosInstance.get<T>(url, config);
			return response.data;
		} catch (error) {
			throw this.handleRequestError(error);
		}
	}

	async post<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		try {
			const response = await this.axiosInstance.post<T>(
				url,
				data,
				config,
			);
			return response.data;
		} catch (error) {
			throw this.handleRequestError(error);
		}
	}

	async put<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> {
		try {
			const response = await this.axiosInstance.put<T>(url, data, config);
			return response.data;
		} catch (error) {
			throw this.handleRequestError(error);
		}
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const response = await this.axiosInstance.delete<T>(url, config);
			return response.data;
		} catch (error) {
			throw this.handleRequestError(error);
		}
	}
}
