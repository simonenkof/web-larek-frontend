import { ICart, IProduct } from '../types';
import { Product } from './Product';
import { IEvents } from './base/Events';
import { EventNames } from '../utils/eventNames';

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
		if (product.price && !this.productInCart(product.id)) {
			this.products.push(product);
			this.events.emit(EventNames.CartUpdateCount, { count: this.products.length });
			this.updateCardPrice();
		}
	}

	/**
	 * Определяет есть ли товар в корзине.
	 * @param {string} productId - Идентификатор товара.
	 * @returns {boolean} true - если товар есть в корзине, иначе false.
	 */
	protected productInCart(productId: string): boolean {
		return this.products.some((item) => item.id === productId);
	}

	/**
	 * Удаляет товар из корзину по его идентификатору. Генерирует событие "cart:remove".
	 * @param {Product} product - Идентификатор товара.
	 */
	removeProduct(product: Product): void {
		this.products = this.products.filter((item) => item.id !== product.id);
		this.events.emit(EventNames.CartUpdateCount, { count: this.products.length });
		this.events.emit(EventNames.CartRemoved, product);
		this.updateCardPrice();
	}

	/**
	 * Обновляет стоимость товаров в корзине.
	 */
	updateCardPrice() {
		this.cartPrice = 0;
		this.products.forEach((product) => (this.cartPrice += product.price));
		this.events.emit(EventNames.CartUpdatePrice, { price: this.cartPrice });
	}

	/**
	 * Очищает корзину от всех добавленных товаров. Генерирует событие "cart:cleared".
	 */
	clear(): void {
		this.products = [];
		this.cartPrice = 0;
		this.events.emit(EventNames.CartCleared);
		this.events.emit(EventNames.CartUpdateCount, { count: 0 });
		this.events.emit(EventNames.CartUpdatePrice, { price: 0 });
	}
}
