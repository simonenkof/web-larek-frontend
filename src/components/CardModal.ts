import { Modal } from './Modal';
import { IEvents } from './base/events';

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
	 * Модальное окно карточки товара.
	 * @type {HTMLElement}
	 * @protected
	 */
	protected element: HTMLElement;

	/**
	 * Создает экземпляр класса.
	 * @param {IEvents} events - Инстант брокера событий.
	 * @param {HTMLTemplateElement} modalTemplate - Контента модального окна.
	 */
	constructor(events: IEvents, modalTemplate: HTMLElement) {
		super(modalTemplate);
		this.events = events;

		this.toCartButton = modalTemplate.querySelector('card__button');
		this.toCartButton?.addEventListener('click', this.handleToCartButtonClick);
	}

	/**
	 * Обработчик события "click" кнопки добавления в корзину. Генерирует событие "cart:add".
	 */
	handleToCartButtonClick() {
		this.events.emit('cart:add');
	}
}
