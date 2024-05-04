import { IModal } from '../types/index';
import { Product } from './Product';

export class Modal implements IModal {
	/**
	 * Модальное окно.
	 * @type {HTMLDivElement}
	 * @protected
	 */
	protected modal: HTMLDivElement | null;

	/**
	 * Содержимое модального окна.
	 * @type {HTMLDivElement}
	 * @protected
	 */
	protected modalContent: HTMLDivElement | HTMLElement;

	/**
	 * Создает экземпляр класса.
	 * @param {HTMLDivElement | Product} modalContent - Содержимое модального окна.
	 */
	constructor(modalContent: HTMLDivElement | HTMLElement) {
		this.modal = document.querySelector('#modal-container');
		this.modalContent = modalContent;

		const modalContentContainer = this.modal?.querySelector('.modal__content');

		if (this.modalContent instanceof Product) {
			modalContentContainer?.append(this.modalContent.render());
		} else {
			modalContentContainer?.append(this.modalContent);
		}

		this.setupEventListeners();
	}

	/**
	 * Настраивает слушателей событий.
	 * @protected
	 */
	protected setupEventListeners(): void {
		const closeButton = this.modal.querySelector('.modal__close');
		closeButton?.addEventListener('click', () => this.close());
	}

	/**
	 * Открывает модальное окно.
	 */
	open(): void {
		if (this.modal) this.modal.style.display = 'block';
	}

	/**
	 * Закрывает модальное окно.
	 */
	close(): void {
		if (this.modal) {
			this.modal.style.display = 'none';
			this.modalContent.remove();
		}
	}

	/**
	 * Возвращает модальное окно.
	 * @returns {HTMLDivElement | null} Модальное окно
	 */
	render(): HTMLDivElement | null {
		return this.modal;
	}
}
