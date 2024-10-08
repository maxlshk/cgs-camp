import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosError,
	InternalAxiosRequestConfig,
} from 'axios';
import { UESR_API_KEYS } from '~shared/keys';
import { useUserStore } from '~store/user.store';

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
				const { accessToken } = useUserStore.getState();
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
						const {
							refreshToken,
							setAccessToken,
							setRefreshToken,
							logOut,
						} = useUserStore.getState();

						if (!refreshToken) {
							// No refresh token, log out and redirect
							logOut();
							window.location.href = '/login';
							return Promise.reject(error);
						}

						// Make a direct API call to refresh the token
						const response = await axios.post(
							`${this.axiosInstance.defaults.baseURL}${UESR_API_KEYS.REFRESH_TOKEN}`,
							{ refreshToken },
						);

						const {
							accessToken: newAccessToken,
							refreshToken: newRefreshToken,
						} = response.data;

						// Update tokens in the store
						setAccessToken(newAccessToken);
						setRefreshToken(newRefreshToken);

						// Update the authorization header
						if (originalRequest.headers) {
							originalRequest.headers['Authorization'] =
								`Bearer ${newAccessToken}`;
						}

						// Retry the original request
						return this.axiosInstance(originalRequest);
					} catch (refreshError) {
						// Refresh token failed, log out and redirect
						const { logOut } = useUserStore.getState();
						logOut();
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
