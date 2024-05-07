import { ICart, IProduct } from '../types';
import { IEvents } from './base/events';

/**
 * Представляет корзину товаров.
 * @implements {ICart}
 */
export class Cart implements ICart {
	/**
	 * Список товаров в корзине.
	 * @type {IProduct[]}
	 * @protected
	 */
	protected _products: IProduct[] = [];

	/**
	 * Экземпляр брокера событий.
	 * @type {IEvents}
	 */
	protected events: IEvents;

	/**
	 * Цена корзины товаров.
	 * @type {number}
	 * @protected
	 */
	protected _cartPrice: number;

	/**
	 * Создает экземпляр класса.
	 * @param {IEvents} events - Экзампляр брокера событий.
	 */
	constructor(events: IEvents) {
		this.events = events;
		this._cartPrice = 0;
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
	 * Возвращает стоимость всех товаров в корзине.
	 * @returns {number} Стоимость товаров в корзине.
	 */
	get cartPrice(): number {
		return this._cartPrice;
	}

	/**
	 * Устанавливает стоимость товаров в корзине.
	 * @param {number} newPrice - Стоимость товаров в корзине.
	 */
	set cartPrice(newPrice: number) {
		this._cartPrice = newPrice;
	}

	/**
	 * Добавлет товар в корзину. Генерирует событие "cart:added".
	 * @param {IProduct} product - Товар, который нужно добавить.
	 */
	addProduct(product: IProduct): void {
		if (product.price) {
			this.products.push(product);
			this.cartPrice = this.cartPrice + product.price;
			this.events.emit('cart:updateCount', { count: this.products.length });
		}
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
		this.cartPrice = 0;
		this.events.emit('cart:cleared');
	}
}
