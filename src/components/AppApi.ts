import { IApi, IProduct, IOrderSuccess, TProducts, TOrder } from '../types';

export class AppApi {
	/**
	 * Базовый апи.
	 * @type {IApi}
	 * @private
	 */
	private _baseApi: IApi;

	/**
	 * Создает экземпляр класса.
	 * @param {IApi} baseApi - Базовый апи.
	 */
	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	/**
	 * Отправляет запрос на сервер и возвращает массив товаров и их количество.
	 * @returns {Promise<TProducts>} - Массив товаров и их количество.
	 */
	getProducts(): Promise<TProducts> {
		return this._baseApi.get<TProducts>('/product').then((products: TProducts) => products);
	}

	/**
	 * Отправляет запрос на сервер и возвращает товар по его id.
	 * @param {string} id - Идентификатор товара
	 * @returns {Promise<IProduct>} - Товар.
	 */
	getProductById(id: string): Promise<IProduct> {
		return this._baseApi.get<IProduct>(`/product/${id}`).then((product: IProduct) => product);
	}

	/**
	 * Отправляет запрос на сервер и возвращает идентификатор и сумму заказа.
	 * @param {TOrder} data - Информация о заказе
	 * @returns {Promise<IOrderSuccess>} Идентификатор и сумма заказа
	 */
	sendOrder(data: TOrder): Promise<IOrderSuccess> {
		return this._baseApi.post<IOrderSuccess>('/order', data).then((order: IOrderSuccess) => order);
	}
}
