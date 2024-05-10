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
	 * Кнопка оформления заказа.
	 * @type {HTMLButtonElement | null}
	 * @protected
	 */
	protected orderButton: HTMLButtonElement | null;

	/**
	 * Элемент модального окна корзины.
	 */
	protected element: HTMLElement;

	/**
	 * Создает экземпляр класса.
	 * @param {IEvents} events - Инстант брокера событий.
	 * @param {HTMLTemplateElement} modalTemplate - Контента модального окна.
	 */
	constructor(events: IEvents, modalTemplate: HTMLTemplateElement) {
		const clone = cloneTemplate(modalTemplate);
		super(clone);
		this.events = events;
		this.element = clone;

		this.basketList = this.element.querySelector('.basket__list');
		this.basketPrice = this.element.querySelector('.basket__price');
		this.orderButton = this.element.querySelector('.basket__button');

		this.events.on('cart:updatePrice', (product: { price: number }) => this.updateBasketPrice(product.price));
		this.events.on('cart:removed', (product: Product) => this.removeProduct(product));
		this.orderButton?.addEventListener('click', () => this.handleOrderButtonClick());
	}

	/**
	 * Дополняет базовую функцию открытия окна. Обновляет состояние кнопки оформления заказа
	 * перед открытием корзины.
	 */
	open(): void {
		this.updateOrderButtonState();
		super.open();
	}

	/**
	 * Добавляет товар в корзину.
	 * @param {Product} product - Карточка товара.
	 */
	addProduct(product: HTMLElement): void {
		this.basketList?.append(product);
		this.updateProductsCount();
		this.updateOrderButtonState();
	}

	/**
	 * Удаляет товар из корзины.
	 * @param {Product} product - Карточка товара.
	 */
	removeProduct(product: Product): void {
		product.remove();
		this.updateProductsCount();
		this.updateOrderButtonState();
	}

	/**
	 * Обновляет цену корзины товаров.
	 * @param {number} productsPrice - Цена товаров в корзине.
	 */
	updateBasketPrice(productsPrice: number): void {
		if (this.basketPrice) this.basketPrice.textContent = productsPrice.toString() + ' синаспов';
	}

	/**
	 * Обновляет нумерцаию товаров в корзине.
	 */
	updateProductsCount(): void {
		const products: NodeListOf<HTMLLinkElement> = this.element.querySelectorAll('.basket__item');

		products.forEach((product: HTMLElement, index: number) => {
			const productCountElement = product.querySelector('.basket__item-index');

			if (productCountElement) {
				productCountElement.textContent = (index + 1).toString();
			}
		});
	}

	/**
	 * Обработчик события "click" кнопки оформления заказа.
	 * Закрывает модальное окно корзины и вызывает событие "deliveryModal:open".
	 */
	handleOrderButtonClick(): void {
		this.close();
		this.events.emit('deliveryModal:open');
	}

	/**
	 * Обновляет состояние кнопки оформелния заказа.
	 */
	updateOrderButtonState(): void {
		const products: NodeListOf<HTMLLinkElement> = this.element.querySelectorAll('.basket__item');

		this.orderButton.disabled = products.length === 0;
	}
}
