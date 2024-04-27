/**
 * Представляет структуру товара.
 * @interface IProduct
 * @param {string} id - Идентификатор товара.
 * @param {string} description - Описание товара.
 * @param {string} image - Изображение товара.
 * @param {string} title - Название товара.
 * @param {string} category - Категория товара.
 * @param {number} price - Цена товара.
 */
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

/**
 * Представляет структуру списка товаров.
 * @interface IProductList
 * @param {IProduct[]} total - Идентификатор товара.
 * @param {string} items - Описание товара.
 */
export interface IProductList {
	total: number;
	items: IProduct[];
}

/**
 * Представляет структуру заказа.
 * @interface IOrder
 * @param {IProduct[]} payment - Способ оплаты.
 * @param {string} email - Почта покупателя.
 * @param {string} phone - Телефонный номер покупателя.
 * @param {string} address - Адрес покупателя.
 * @param {number} total - Сумма товаров.
 * @param {string[]} items - Список товаров.
 */
export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

/**
 * Представляет структуру чека заказа.
 * @interface IOrderCheck
 * @param {string} id - Идентификатор чека.
 * @param {number} total - Стоимость товаров.
 */
export interface IOrderCheck {
	id: string;
	total: number;
}
