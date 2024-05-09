import { Product } from '../components/Product';

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
	price: number | null;
}

/**
 * Представляет структуру списка товаров.
 * @interface IProductList
 * @param {number} total - Количество товаров.
 * @param {IProduct[]} items - Массив всех товаров.
 * @param {Function} getProduct() - Возвращает товар по id.
 */
export interface IProductList {
	total: number;
	items: IProduct[];
	getProduct(productId: string): IProduct | undefined;
}

/**
 * Представляет структуру информации покупателя.
 * @interface ICustomerData
 * @param {IProduct[]} payment - Способ оплаты.
 * @param {string} email - Почта покупателя.
 * @param {string} phone - Телефонный номер покупателя.
 * @param {string} address - Адрес покупателя.
 */
export interface ICustomerData {
	payment: string;
	email: string;
	phone: string;
	address: string;
}

/**
 * Представляет структуру заказа.
 * @interface IOrder
 * @param {number} total - Сумма товаров.
 * @param {string[]} items - Список товаров.
 * @param {Function} order() - Оформляет заказ.
 */
export interface IOrder extends ICustomerData {
	total: number;
	items: string[];
	order(): void;
}

/**
 * Представляет структуру успешнего заказа.
 * @interface IOrderCheck
 * @param {string} id - Идентификатор заказа.
 * @param {number} total - Стоимость товаров.
 */
export interface IOrderSuccess {
	id: string;
	total: number;
}

/**
 * Предсатвляет структуру корзины товаров.
 * @interface ICart
 * @param {IProduct[]} products - Массив товаров.
 * @param {Function} addProduct() - Добавляет товар в корзину.
 * @param {Function} removeProduct() - Удаляет товар из корзины.
 * @param {Function} clear() - Очищает корзину.
 */
export interface ICart {
	products: IProduct[];
	addProduct(product: IProduct): void;
	removeProduct(product: Product): void;
	clear(): void;
}

/**
 * Представляет структуру формы.
 * @interface IModal
 * @param {Function} open - Открывает форму.
 * @param {Function} close - Закрывает форму.
 */
export interface IModal {
	open(): void;
	close(): void;
}

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object): Promise<T>;
}

// Тип списка запросов к апи.
export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

// Тип для формы с доставкой и способом оплаты товара.
export type TDeliveryForm = Pick<ICustomerData, 'payment' | 'address'>;

// Тип для формы заполнения личных данных покупателя
export type TCustomerInfoForm = Pick<ICustomerData, 'email' | 'phone'>;

// Тип для формы корзины
export type TCartForm = Pick<IProduct, 'title' | 'price'>;

// Тип для формы карточки товара
export type TProductCardForm = Pick<IProduct, 'title' | 'description' | 'image' | 'category' | 'price'>;

// Тип для ответа сервера при получении всех товаров
export type TProducts = Pick<IProductList, 'total' | 'items'>;

// Тип для запроса об оформлении заказа к серверу
export type TOrder = Pick<IOrder, 'payment' | 'email' | 'phone' | 'address' | 'total' | 'items'>;
