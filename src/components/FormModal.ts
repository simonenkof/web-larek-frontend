import { cloneTemplate } from '../utils/utils';
import { Modal } from './Modal';
import { IEvents } from './base/events';
import { EventNames } from '../utils/eventNames';

export class FormModal extends Modal {
	/**
	 * Иснтанс брокера событий.
	 * @type {IEvents}
	 * @protected
	 */
	protected events: IEvents;

	/**
	 * Элемент формы.
	 * @type {HTMLElement}
	 * @protected
	 */
	protected form: HTMLElement;

	/**
	 * Кнопка сабмита.
	 * @type {HTMLButtonElement | null}
	 * @protected
	 */
	protected submitButton: HTMLButtonElement | null;

	/**
	 * Псевдомассив кнопок выбора способа оплаты.
	 * @type {NodeListOf<HTMLButtonElement>}
	 * @protected
	 */
	protected paymentButtons: NodeListOf<HTMLButtonElement>;

	/**
	 * Псевдомассив полей ввода.
	 * @type {NodeListOf<HTMLInputElement>}
	 * @protected
	 */
	protected inputs: NodeListOf<HTMLInputElement>;

	/**
	 * Флаг формы доставки и оплаты.
	 * @type {boolean}
	 * @protected
	 */
	protected deliveryForm: boolean;

	/**
	 * Способ оплаты..
	 * @type {string}
	 * @protected
	 */
	protected payment: string;

	/**
	 * Создает экземпляр класса.
	 * @param {IEvents} events - Экземпляр брокера событий.
	 * @param {HTMLTemplateElement} template - Шаблон формы.
	 */
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

	/**
	 * Обработчик события 'click'. Изменяет предпочитаемый способ оплаты.
	 * @param {MouseEvent} event - Объект события.
	 */
	protected handlePaymentButtonClick(event: MouseEvent): void {
		const button = event.target as HTMLButtonElement;
		this.payment = button.textContent;

		this.paymentButtons.forEach((button) => {
			button.classList.remove('button_alt-active');
		});

		button.classList.add('button_alt-active');

		this.changeSubmitButtonState(this.isPaymentSelected() && this.isInputsFilled());
	}

	/**
	 * Проверяет наличие выбранного способа оплаты.
	 * @returns {boolean} true - если способ оплаты выбран. false - если нет.
	 */
	protected isPaymentSelected(): boolean {
		if (this.deliveryForm) {
			return Array.from(this.paymentButtons).some((element) => element.classList.contains('button_alt-active'));
		} else {
			return true;
		}
	}

	/**
	 * Проверяет заполнение полей ввода.
	 * @returns {boolean} true - если поля заполнены. false - если нет.
	 */
	protected isInputsFilled(): boolean {
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].value.trim() === '') {
				return false;
			}
		}
		return true;
	}

	/**
	 * Изменяет состояние кнопки подветрждения формы
	 * @param {boolean} state - Состояние.
	 */
	protected changeSubmitButtonState(state: boolean): void {
		this.submitButton.disabled = !state;
	}

	/**
	 * Обработчик события "click" кнопки подтверждения формы.
	 * Отменяет стандартное поведение подтверждения формы.
	 * Генерирует нужное событие в зависимости от текущей формы.
	 * @param {MouseEvent} event - Объект события.
	 */
	handleSubmitButtonClick(event: MouseEvent) {
		event.preventDefault();

		if (this.deliveryForm) {
			this.events.emit(EventNames.DeliveryModalSubmit, { address: this.inputs[0].value, payment: this.payment });
			this.close();
			this.events.emit(EventNames.ContactsModalOpen);
		} else {
			this.events.emit(EventNames.ContactsModalSubmit, { email: this.inputs[0].value, phone: this.inputs[1].value });
			this.close();
		}
	}
}
