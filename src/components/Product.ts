import { IEvents } from './base/events';
import { IProduct } from '../types';
import { cloneTemplate } from '../utils/utils';
import { categories } from '../utils/constants';

export class Product {
	/**
	 * Экземпляр брокера событий
	 * @type {IEvents}
	 * @protected
	 */
	protected events: IEvents;

	/**
	 * Шаблон карточки товара.
	 * @type {HTMLElement}
	 * @protected
	 */
	protected element: HTMLElement;

	/**
	 * Элемент названия товора.
	 * @type {HTMLSpanElement | HTMLHeadingElement}
	 * @protected
	 */
	protected titleElement: HTMLSpanElement | HTMLHeadingElement;

	/**
	 * Элемент изображения товара.
	 * @type {HTMLImageElement | null}
	 * @protected
	 */
	protected imageElement: HTMLImageElement | null;

	/**
	 * Элемент категории товара.
	 * @type {HTMLSpanElement | null}
	 * @protected
	 */
	protected categoryElement: HTMLSpanElement | null;

	/**
	 * Элемент стоимости товара.
	 * @type {HTMLSpanElement | null}
	 * @protected
	 */
	protected priceElement: HTMLSpanElement;

	/**
	 * Элемент описания товара.
	 * @type {HTMLParagraphElement | null}
	 * @protected
	 */
	protected descriptionElement: HTMLParagraphElement | null;

	/**
	 * Элемент кнопки удаления товара из корзины.
	 * @type {HTMLButtonElement | null}
	 * @protected
	 */
	protected cardButton: HTMLButtonElement | null;

	/**
	 * Создает экземпляр класса.
	 * @param {IEvents} events - Экземпляр брокера событий.
	 * @param {HTMLTemplateElement} element - Шаблон карточки товара.
	 */
	constructor(events: IEvents, element: HTMLTemplateElement) {
		this.events = events;
		this.element = cloneTemplate(element);
		this.titleElement = this.element.querySelector('.card__title');
		this.imageElement = this.element.querySelector('.card__image');
		this.categoryElement = this.element.querySelector('.card__category');
		this.priceElement = this.element.querySelector('.card__price');
		this.descriptionElement = this.element.querySelector('.card__text');
		this.cardButton = this.element.querySelector('.card__button');

		this.setupEventListeners();
	}

	/**
	 * Устанавливает название товара.
	 * @param {string} newTitle - Название товара.
	 */
	set title(newTitle: string) {
		this.titleElement.textContent = newTitle;
	}

	/**
	 * Устанавливает изображение товара.
	 * @param {string} newImage - Изображение товара.
	 */
	set image(newImage: string) {
		this.imageElement.src = newImage;
	}

	/**
	 * Устанавливает категорию товара.
	 * @param {string} newCategory - Категория товара.
	 */
	set category(newCategory: string) {
		this.categoryElement.textContent = newCategory;
		this.updateCategotyColor(this.categoryElement, newCategory);
	}

	/**
	 * Устанавливает стоимость товара.
	 * @param {string} newPrice - Стоимость товара.
	 */
	set price(newPrice: string) {
		this.priceElement.textContent = newPrice ? `${newPrice} синапсов` : 'Бесценно';
	}

	/**
	 * Устанавливает описание товара.
	 * @param {string} newDescription - Описание товара.
	 */
	set description(newDescription: string) {
		this.descriptionElement.textContent = newDescription;
	}

	/**
	 * Настравиает слушателей событий.
	 */
	protected setupEventListeners(): void {
		if (this.element.classList.contains('gallery__item')) {
			this.element.addEventListener('click', () => this.handleOnProductClick());
		}

		const isDeleteButton = this.cardButton?.classList.contains('basket__item-delete');
		const handler = isDeleteButton ? this.handleRemoveButtonClick : this.handleToCartButtonClick;

		this.cardButton?.addEventListener('click', () => handler());
	}

	/**
	 * Устанавливает данные товара. В метод можно передать как часть данных о товаре, так и полностью.
	 * @param {Partial<IProduct>} productData - Данные о товаре.
	 */
	setData(productData: Partial<IProduct>): HTMLElement {
		const { image, category, description, ...otherData } = productData;

		if (this.imageElement) this.image = image;
		if (this.categoryElement) this.category = category;
		if (this.descriptionElement) this.description = description;

		Object.assign(this, otherData);

		return this.element;
	}

	/**
	 * Обновляет цвет категории товара.
	 * @param {HTMLSpanElement} categoryElement - Элемент категории.
	 * @param {string} category - Категория товара.
	 */
	protected updateCategotyColor(categoryElement: HTMLSpanElement, category: string): void {
		categoryElement.className = '';
		categoryElement.classList.add('card__category', `card__category${categories[category]}`);
	}

	/**
	 * Обработчик события "click" кнопки удаления товара из корзины.
	 * Генерирует событие "cart:removed".
	 */
	protected handleRemoveButtonClick(): void {
		this.events.emit('cart:removed', this);
	}

	/**
	 * Обработчик события "click" по карточке товара.
	 * Генерирует событие "cardModal:open".
	 */
	protected handleOnProductClick(): void {
		this.events.emit('cardModal:open', this);
	}

	/**
	 * Обработчик события "click" кнопки добавления товара в корзину.
	 */
	protected handleToCartButtonClick(): void {
		this.events.emit('cart:add', this);
	}
}
