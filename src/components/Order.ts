import { IEvents } from './base/events';
import { IOrder, IOrderSuccess, IApi } from '../types';
import { AppApi } from './AppApi';

/**
 * Представляет заказ товаров.
 * @implements {IOrder}
 */
export class Order implements IOrder {
	/**
	 * Количество товаров в заказе.
	 * @type {number}
	 * @protected
	 */
	protected _total: number;

	/**
	 * Массив идентификаторов товаров.
	 * @type {string[]}
	 * @protected
	 */
	protected _items: string[];

	/**
	 * Способ оплаты заказа.
	 * @type {IProduct[]}
	 * @protected
	 */
	protected _payment: string;

	/**
	 * Почта покупателя.
	 * @type {string}
	 * @protected
	 */
	protected _email: string;

	/**
	 * Телефон покупателя.
	 * @type {string}
	 * @protected
	 */
	protected _phone: string;

	/**
	 * Адрес получателя.
	 * @type {string}
	 * @protected
	 */
	protected _address: string;

	/**
	 * Экземпляр брокера событий.
	 * @type {IEvents}
	 */
	protected events: IEvents;

	/**
	 * Экземпляр Api.
	 * @type {IApi}
	 */
	protected api: AppApi;

	/**
	 * Создает экземпляр класса.
	 * @param {AppApi} events - Экзампляр брокера событий.
	 */
	constructor(events: IEvents, api: AppApi) {
		this.events = events;
		this.api = api;
	}

	/**
	 * Вовзращает количество товаров в заказе.
	 * @returns {number} Количество товаров
	 */
	get total(): number {
		return this._total;
	}

	/**
	 * Устанавливает количество товаров в заказе.
	 * @param {number} productsCount - Количество товаров.
	 */
	set total(productsCount: number) {
		this._total = productsCount;
	}

	/**
	 * Возвращает массив идентификаторов товаров в заказе.
	 * @returns {string[]} Массив идентификаторов товаров
	 */
	get items(): string[] {
		return this._items;
	}

	/**
	 * Устанавливает массив идентификаторов товаров в заказе.
	 * @param {string[]} productsId - Массив идентификаторов товаров.
	 */
	set items(productsId: string[]) {
		this._items = productsId;
	}

	/**
	 * Возвращает способ оплаты заказа.
	 * @returns {string} Способ оплаты заказа
	 */
	get payment(): string {
		return this._payment;
	}

	/**
	 * Устанавливает способ оплаты заказа.
	 * @param {string} newPayment - Способ оплаты заказа
	 */
	set payment(newPayment: string) {
		this._payment = newPayment;
	}

	/**
	 * Возвращает почту покупателя.
	 * @returns {string} Почта покупателя
	 */
	get email(): string {
		return this._email;
	}

	/**
	 * Устанавливает почту покупателя.
	 * @param {string} newEmail - Почта покупателя.
	 */
	set email(newEmail: string) {
		this._email = newEmail;
	}

	/**
	 * Возвращает телефон покупателя.
	 * @returns {string} Телефон покупателя
	 */
	get phone(): string {
		return this._phone;
	}

	/**
	 * Устанавливает телефон покупателя.
	 * @param {string} newPhone - Телефон покупателя
	 */
	set phone(newPhone: string) {
		this._phone = newPhone;
	}

	/**
	 * Возвращает адрес покупателя.
	 * @returns {string} Адрес покупателя
	 */
	get address(): string {
		return this._address;
	}

	/**
	 * Устанавливает адрес покупателя.
	 * @param {string} newAddress - Адрес покупателя
	 */
	set address(newAddress: string) {
		this._address = newAddress;
	}

	/**
	 * Отправляет запрос на сервер с информацией о заказе. Генерирует событие "order:sent" и передает
	 * в нем информацию о совершенном заказе.
	 */
	order(): void {
		const orderPayload = {
			payment: this.payment,
			email: this.email,
			phone: this.phone,
			address: this.address,
			total: this.total,
			items: this.items,
		};

		this.api
			.sendOrder(orderPayload)
			.then((res: IOrderSuccess) => this.events.emit('order:sent', { total: res.total }))
			.catch((error) => console.error(error));
	}
}
