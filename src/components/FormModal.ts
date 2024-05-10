import { cloneTemplate } from '../utils/utils';
import { Modal } from './Modal';
import { IEvents } from './base/events';

export class FormModal extends Modal {
	protected events: IEvents;

	protected form: HTMLElement;

	protected submitButton: HTMLButtonElement | null;

	protected paymentButtons: NodeListOf<HTMLButtonElement>;

	protected inputs: NodeListOf<HTMLInputElement>;

	protected deliveryForm: boolean;

	protected payment: string;

	constructor(events: IEvents, template: HTMLTemplateElement) {
		const clone = cloneTemplate(template);
		super(clone);
		this.events = events;
		this.form = clone;

		this.deliveryForm = (this.form as HTMLFormElement).name === 'order';

		this.submitButton = this.form.querySelector('button[type="submit"]');
		this.paymentButtons = this.form.querySelectorAll('.button_alt');
		this.inputs = this.form.querySelectorAll('.form__input');

		this.submitButton.addEventListener('click', (event: MouseEvent) => this.handleSubmitButtonClick(event));

		this.paymentButtons.forEach((button) => {
			button.addEventListener('click', (event: MouseEvent) => this.handlePaymentButtonClick(event));
		});

		this.inputs.forEach((input) => {
			input.addEventListener('input', () =>
				this.changeSubmitButtonState(this.isPaymentSelected() && this.isInputsFilled())
			);
		});
	}

	handlePaymentButtonClick(event: MouseEvent) {
		const button = event.target as HTMLButtonElement;
		this.payment = button.textContent;

		this.paymentButtons.forEach((button) => {
			button.classList.remove('button_alt-active');
		});

		button.classList.add('button_alt-active');

		this.changeSubmitButtonState(this.isPaymentSelected() && this.isInputsFilled());
	}

	isPaymentSelected(): boolean {
		if (this.deliveryForm) {
			return Array.from(this.paymentButtons).some((element) => element.classList.contains('button_alt-active'));
		} else {
			return true;
		}
	}

	isInputsFilled(): boolean {
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].value.trim() === '') {
				return false;
			}
		}
		return true;
	}

	changeSubmitButtonState(state: boolean) {
		this.submitButton.disabled = !state;
	}

	handleSubmitButtonClick(event: MouseEvent) {
		event.preventDefault();

		if (this.deliveryForm) {
			this.events.emit('deliveryModal:submit', { address: this.inputs[0].value, payment: this.payment });
			this.close();
			this.events.emit('contactsModal:open');
		} else {
			this.events.emit('contacntsModal:submit', { email: this.inputs[0].value, phone: this.inputs[1].value });
			this.close();
		}
	}
}
