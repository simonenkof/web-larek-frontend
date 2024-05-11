import { IModal } from '../types/index';
import { Product } from './Product';
import { ensureElement } from '../utils/utils';

export class Modal implements IModal {
	/**
	 * Модальное окно.
	 * @type {HTMLDivElement}
	 * @protected
	 */
	protected modal: HTMLDivElement;

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
		this.modal = ensureElement<HTMLDivElement>('#modal-container');
		this.modalContent = modalContent;

		const modalContentContainer = this.modal.querySelector('.modal__content');

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
		const closeButton = ensureElement<HTMLButtonElement>('.modal__close');
		closeButton.addEventListener('click', () => this.close());
		this.modal.addEventListener('click', (event: MouseEvent) => this.handleModalClick(event));
	}

	/**
	 * Обработчик события нажатия на модальное окно. Если нажатие было вне модального окна,
	 * то закрывает его.
	 * @param {MouseEvent} event - Событие нажатия.
	 */
	protected handleModalClick(event: MouseEvent): void {
		if (event.target === this.modal) {
			this.close();
		}
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
	 * @returns {HTMLDivElement} Модальное окно
	 */
	render(): HTMLDivElement {
		return this.modal;
	}
}
