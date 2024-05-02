import { IProduct, IProductList } from '../types';
import { IEvents } from './base/events';

/**
 * Представляет список товаров.
 * @implements {IProductList}
 */
export class ProductList implements IProductList {
	/**
	 * Общее количество товаров.
	 * @type {number}
	 * @protected
	 */
	protected _total: number;

	/**
	 * Список товаров.
	 * @type {IProduct[]}
	 * @protected
	 */
	protected _items: IProduct[];

	/**
	 * Экземпляр брокера событий.
	 * @type {IEvents}
	 */
	protected events: IEvents;

	/**
	 * Создает экземпляр класса.
	 * @param {IEvents} events - Экзампляр брокера событий.
	 */
	constructor(events: IEvents) {
		this.events = events;
	}

	/**
	 * Возвращает общее количество товаров в списке.
	 * @returns {number} Количество товаров
	 */
	get total(): number {
		return this._total;
	}

	/**
	 * Устанавливает общее количество товаров в списке.
	 * @param {number} newCount - Новое количество товаров в списке.
	 */
	set total(newCount: number) {
		this._total = newCount;
	}

	/**
	 * Возвращает массив товаров в списке.
	 * @returns {IProduct[]} Массив товаров
	 */
	get items(): IProduct[] {
		return this._items;
	}

	/**
	 * Устанавливает массив товаров в списке. Генерирует событие "productList:changed".
	 * @param {IProduct[]} productsArr - Новый массив товаров.
	 */
	set items(productsArr: IProduct[]) {
		this._items = productsArr;
		this.total = productsArr.length;
		this.events.emit('productList:changed');
	}

	/**
	 * Возвращает товар по его идентификатору из списка товаров. Если товара с указанном идентификатором
	 * не существует, то возвращается undefined.
	 * @param {string} productId - Идентификатор товара.
	 * @returns {IProduct | undefined} Товар или ничего
	 */
	getProduct(productId: string): IProduct | undefined {
		return this.items.find((product) => product.id === productId);
	}
}
