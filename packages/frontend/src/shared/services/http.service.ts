import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class HttpService {
	private axiosInstance: AxiosInstance;

	constructor(baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
		});
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.get<T>(url, config);
		return response.data;
	}

	async post<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<{ message: string; data: T }> {
		const response = await this.axiosInstance.post<T>(url, data, config);
		const responseData = response.data as { message: string; todo: T };
		return { message: responseData.message, data: responseData.todo };
	}

	async put<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<{ message: string; data: T }> {
		const response = await this.axiosInstance.put<T>(url, data, config);
		const responseData = response.data as { message: string; todo: T };
		return { message: responseData.message, data: responseData.todo };
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.delete<T>(url, config);
		return response.data;
	}
}
