import { IOrderSuccess } from '../types';
import { cloneTemplate } from '../utils/utils';
import { Modal } from './Modal';
import { IEvents } from './base/events';

export class SuccessModal extends Modal {
	protected events: IEvents;

	protected element: HTMLElement;

	protected orderData: IOrderSuccess;

	protected modalOrderPriceElement: HTMLParagraphElement | null;

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

	updateOrderPrice(total: number) {
		if (this.modalOrderPriceElement) {
			this.modalOrderPriceElement.textContent = `Списано ${total} синапсов`;
		}
	}

	handleSuccesButtonClick() {
		this.close();
	}
}
