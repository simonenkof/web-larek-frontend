import { IOrderSuccess } from '../types';
import { cloneTemplate } from '../utils/utils';
import { Modal } from './Modal';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

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
	protected modalOrderPriceElement: HTMLParagraphElement;

	/**
	 * Элемент кнопки модального окна.
	 * @type {HTMLButtonElement | null}
	 * @protected
	 */
	protected successButtonElement: HTMLButtonElement;

	constructor(events: IEvents, template: HTMLTemplateElement, orderData: IOrderSuccess) {
		const clone = cloneTemplate(template);
		super(clone);
		this.events = events;
		this.element = clone;
		this.orderData = orderData;

		this.modalOrderPriceElement = ensureElement<HTMLParagraphElement>('.order-success__description', this.element);
		this.successButtonElement = ensureElement<HTMLButtonElement>('.button', this.element);

		this.successButtonElement?.addEventListener('click', () => this.close());

		this.updateOrderPrice(orderData.total);
	}

	/**
	 * Обновляет цену заказа.
	 * @param {number} total - Стоимость заказа.
	 */
	updateOrderPrice(total: number): void {
		if (this.modalOrderPriceElement) {
			this.modalOrderPriceElement.textContent = `Списано ${total} синапсов`;
		}
	}
}
