import { IProduct } from '../types';
import { ensureElement } from '../utils/utils';
import { Product } from './Product';
import { IEvents } from './base/events';

export class Page {
	/**
	 * Иснтанс брокера событий.
	 * @type {IEvents}
	 * @protected
	 */
	protected events: IEvents;

	/**
	 * Кнопка открытия корзины.
	 * @type {HTMLButtonElement}
	 * @protected
	 */
	protected basketButton: HTMLButtonElement;

	/**
	 * Элемент галереи товаров.
	 * @type {HTMLElement}
	 * @protected
	 */
	protected gallery: HTMLElement;

	/**
	 * Шаблон карточки в каталоге.
	 * @type {HTMLTemplateElement}
	 * @protected
	 */
	protected cardCatalogTemplate: HTMLTemplateElement;

	/**
	 * Создает экземпляр класса.
	 * @param {IEvents} events - Инстант брокера событий.
	 */
	constructor(events: IEvents) {
		this.events = events;
		this.basketButton = ensureElement<HTMLButtonElement>('.header__basket');
		this.gallery = ensureElement<HTMLElement>('.gallery');
		this.cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

		this.setupEventListener();
	}

	/**
	 * Настраивает слушателей  событий.
	 */
	protected setupEventListener(): void {
		this.basketButton.addEventListener('click', () => this.events.emit('cartModal:open'));
		this.events.on('productList:changed', (products: IProduct[]) => this.setProducts(products));
	}

	/**
	 * Устанавливает список товаров.
	 * @param {IProduct[]} products - Список товаров.
	 */
	protected setProducts(products: IProduct[]): void {
		products.forEach((productData: IProduct) => {
			const product = new Product(this.events, this.cardCatalogTemplate);

			this.gallery.append(product.setData(productData));
		});
	}
}
