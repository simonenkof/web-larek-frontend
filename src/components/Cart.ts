import { ICart, IProduct } from '../types';
import { IEvents } from './base/events';

/**
 * Представляет корзину товаров.
 * @implements {IProductList}
 */
export class Cart implements ICart {
	/**
	 * Список товаров в корзине.
	 * @type {IProduct[]}
	 * @protected
	 */
	protected _products: IProduct[];

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
	 * Возвращает массив товаров в корзине.
	 * @returns {IProduct[]} Массив товаров
	 */
	get products(): IProduct[] {
		return this._products;
	}

	/**
	 * Устанавливает массив товаров в корзине.
	 * @param {IProduct[]} productsArr - Новый массив товаров.
	 */
	set products(productsArr: IProduct[]) {
		this._products = productsArr;
	}

	/**
	 * Добавлет товар в корзину. Генерирует событие "cart:added".
	 * @param {IProduct} product - Товар, который нужно добавить.
	 */
	addProduct(product: IProduct): void {
		this.products.push(product);
		this.events.emit('cart:added');
	}

	/**
	 * Удаляет товар из корзину по его идентификатору. Генерирует событие "cart:removed".
	 * @param {string} productId - Идентификатор товара.
	 */
	removeProduct(productId: string): void {
		this.products = this.products.filter((product) => product.id !== productId);
		this.events.emit('cart:removed');
	}

	/**
	 * Очищает корзину от всех добавленных товаров. Генерирует событие "cart:cleared".
	 */
	clear(): void {
		this.products = [];
		this.events.emit('cart:cleared');
	}
}
