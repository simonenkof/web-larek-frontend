import { IApi } from '../../types';

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api implements IApi {
	readonly baseUrl: string;
	protected options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				...((options.headers as object) ?? {}),
			},
		};
	}

	/**
	 * Обрабатывает ответ сервера. Если статус ответа 200, то возвращает данные, в противном случае возвращает ошибку.
	 * @param {Response} response - Ответ сервера.
	 * @returns {Promise<T>} Ответ сервера.
	 */
	protected handleResponse<T>(response: Response): Promise<T> {
		if (response.ok) return response.json();
		else return response.json().then((data) => Promise.reject(data.error ?? response.statusText));
	}

	/**
	 * Отправляет GET запрос на сервер и возвращает его ответ.
	 * @param {string} uri - URI запроса.
	 * @returns {Promise<T>} Ответ сервера
	 */
	get<T>(uri: string): Promise<T> {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method: 'GET',
		}).then(this.handleResponse<T>);
	}

	/**
	 * Отправляет POST/PUT/DELETE запрос на сервер и возвращает его ответ.
	 * @param {string} uri - URI запроса.
	 * @param {object} data - Данные запроса.
	 * @param {ApiPostMethods} method - Метод запроса.
	 * @returns {Promise<T>} Ответ сервера
	 */
	post<T>(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<T> {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then(this.handleResponse<T>);
	}
}
