import { IOrderSuccess } from '../types';
import { cloneTemplate } from '../utils/utils';
import { Modal } from './Modal';
import { IEvents } from './base/events';

export class SuccessModal extends Modal {
	/**
	 * Иснтанс брокера событий.
	 * @type {IEvents}
	 * @protected
	 */
	protected events: IEvents;

	/**
	 * Элемент модального окна успешного заказа.
	 * @type {HTMLElement}
	 * @protected
	 */
	protected element: HTMLElement;

	/**
	 * Данные успешного заказа.
	 * @type {IOrderSuccess}
	 * @protected
	 */
	protected orderData: IOrderSuccess;

	/**
	 * Элемент надписи успешного заказа.
	 * @type {HTMLParagraphElement | null}
	 * @protected
	 */
	protected modalOrderPriceElement: HTMLParagraphElement | null;

	/**
	 * Элемент кнопки модального окна.
	 * @type {HTMLButtonElement | null}
	 * @protected
	 */
	protected successButtonElement: HTMLButtonElement | null;

	constructor(events: IEvents, template: HTMLTemplateElement, orderData: IOrderSuccess) {
		const clone = cloneTemplate(template);
		super(clone);
		this.events = events;
		this.element = clone;
		this.orderData = orderData;

		this.modalOrderPriceElement = this.element.querySelector('.order-success__description');
		this.successButtonElement = this.element.querySelector('.button');

		this.successButtonElement?.addEventListener('click', () => this.handleSuccesButtonClick());

		this.updateOrderPrice(orderData.total);
	}

	/**
	 * Обновляет цену заказа.
	 * @param {number} total - Стоимость заказа.
	 */
	updateOrderPrice(total: number) {
		if (this.modalOrderPriceElement) {
			this.modalOrderPriceElement.textContent = `Списано ${total} синапсов`;
		}
	}

	/**
	 * Обработчик события "click" кнопки модального окна. Закрывает окно.
	 */
	handleSuccesButtonClick() {
		this.close();
	}
}
