import { IProduct } from '../types';
import { Modal } from './Modal';
import { IEvents } from './base/events';
import { EventNames } from '../utils/eventNames';

export class CardModal extends Modal {
	/**
	 * Иснтанс брокера событий.
	 * @type {IEvents}
	 * @protected
	 */
	protected events: IEvents;

	/**
	 * Элемент кнопки "В корзину"
	 * @type {HTMLButtonElement | null}
	 * @protected
	 */
	protected toCartButton: HTMLButtonElement | null;

	/**
	 * Создает экземпляр класса.
	 * @param {IEvents} events - Инстант брокера событий.
	 * @param {HTMLElement} product - Контента модального окна.
	 */
	constructor(events: IEvents, product: HTMLElement, productData: IProduct) {
		super(product);
		this.events = events;

		this.toCartButton = product.querySelector('.card__button');
		this.toCartButton?.addEventListener('click', () => this.handleToCartButtonClick(productData));
	}

	/**
	 * Обработчик события "click" кнопки добавления в корзину. Генерирует событие "cart:add".
	 */
	handleToCartButtonClick(productData: IProduct) {
		this.close();
		this.events.emit(EventNames.CartAdd, productData);
	}
}
