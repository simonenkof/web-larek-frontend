import { cloneTemplate } from '../utils/utils';
import { Modal } from './Modal';
import { Product } from './Product';
import { IEvents } from './base/events';

export class CartModal extends Modal {
	/**
	 * Иснтанс брокера событий.
	 * @type {IEvents}
	 * @protected
	 */
	protected events: IEvents;

	/**
	 * Элемент списка товаров в корзине.
	 * @type {HTMLUListElement | null}
	 * @protected
	 */
	protected basketList: HTMLUListElement | null;

	/**
	 * Элемент суммы товаров в корзине.
	 * @type {HTMLUListElement | null}
	 * @protected
	 */
	protected basketPrice: HTMLUListElement | null;

	/**
	 * Создает экземпляр класса.
	 * @param {IEvents} events - Инстант брокера событий.
	 * @param {HTMLTemplateElement} modalTemplate - Контента модального окна.
	 */
	constructor(events: IEvents, modalTemplate: HTMLTemplateElement) {
		const clone = cloneTemplate(modalTemplate);
		super(clone);
		this.events = events;

		this.basketList = clone.querySelector('.basket__list');
		this.basketPrice = clone.querySelector('.basket__price');
	}

	/**
	 * Добавляет товар в корзину.
	 * @param {Product} product - Карточка товара.
	 */
	addProduct(product: HTMLElement, productCount: number): void {
		const productCountElement = product.querySelector('.basket__item-index');

		if (productCountElement) productCountElement.textContent = productCount.toString();

		this.basketList?.append(product);
	}

	/**
	 * Обновляет цену корзины товаров.
	 * @param {number} productsPrice - Цена товаров в корзине.
	 */
	updateBasketPrice(productsPrice: number): void {
		if (this.basketPrice) this.basketPrice.textContent = productsPrice.toString() + ' синаспов';
	}

	/**
	 * Удаляет товар из корзины.
	 * @param {Product} product - Карточка товара.
	 */
	removeProduct(product: Product): void {
		product.remove();
	}
}
