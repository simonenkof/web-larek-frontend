import { cloneTemplate } from '../utils/utils';
import { Modal } from './Modal';
import { Product } from './Product';
import { IEvents } from './base/Events';
import { EventNames } from '../utils/eventNames';
import { ensureElement } from '../utils/utils';

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
	protected basketList: HTMLUListElement;

	/**
	 * Элемент суммы товаров в корзине.
	 * @type {HTMLUListElement | null}
	 * @protected
	 */
	protected basketPrice: HTMLSpanElement;

	/**
	 * Кнопка оформления заказа.
	 * @type {HTMLButtonElement | null}
	 * @protected
	 */
	protected orderButton: HTMLButtonElement;

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

		this.basketList = ensureElement<HTMLUListElement>('.basket__list');
		this.basketPrice = ensureElement<HTMLSpanElement>('.basket__price');
		this.orderButton = ensureElement<HTMLButtonElement>('.basket__button');

		this.events.on(EventNames.CartUpdatePrice, (product: { price: number }) => this.updateBasketPrice(product.price));
		this.events.on(EventNames.CartRemoved, (product: Product) => this.removeProduct(product));
		this.orderButton.addEventListener('click', () => this.handleOrderButtonClick());
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
		this.basketList.append(product);
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
		this.basketPrice.textContent = productsPrice.toString() + ' синапсов';
	}

	/**
	 * Обновляет нумерцаию товаров в корзине.
	 */
	protected updateProductsCount(): void {
		const products: NodeListOf<HTMLLinkElement> = this.element.querySelectorAll('.basket__item');

		products.forEach((product: HTMLElement, index: number) => {
			const productCountElement = ensureElement<HTMLSpanElement>('.basket__item-index', product);

			if (productCountElement) {
				productCountElement.textContent = (index + 1).toString();
			}
		});
	}

	/**
	 * Обработчик события "click" кнопки оформления заказа.
	 * Закрывает модальное окно корзины и вызывает событие "deliveryModal:open".
	 */
	protected handleOrderButtonClick(): void {
		this.close();
		this.events.emit(EventNames.DeliveryModalOpen);
	}

	/**
	 * Обновляет состояние кнопки оформелния заказа.
	 */
	protected updateOrderButtonState(): void {
		const products: NodeListOf<HTMLLinkElement> = this.element.querySelectorAll('.basket__item');

		this.orderButton.disabled = products.length === 0;
	}
}
