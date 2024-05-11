import './scss/styles.scss';

import { IOrderSuccess, IProduct, TOrder } from './types';
import { ensureElement } from './utils/utils';
import { API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { AppApi } from './components/AppApi';
import { Page } from './components/Page';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Order } from './components/Order';
import { Product } from './components/Product';
import { CardModal } from './components/CardModal';
import { CartModal } from './components/CartModal';
import { FormModal } from './components/FormModal';
import { SuccessModal } from './components/SuccessModal';

const events = new EventEmitter();
const api = new AppApi(new Api(API_URL));
const productList = new ProductList(events);
const cart = new Cart(events);
const order = new Order(events);
new Page(events);

const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#success');

api
	.getProducts()
	.then((products) => (productList.items = products.items))
	.catch((err) => console.error(err));

events.on('cardModal:open', (product: Product) => {
	const productData = productList.getProduct(product.id);
	const productItem = new Product(events, cardPreviewTemplate);
	const modal = new CardModal(events, productItem.setData(productData), productData);

	modal.open();
});

events.on('cart:add', (product: IProduct) => cart.addProduct(product));
events.on('cart:remove', (product: Product) => cart.removeProduct(product));

events.on('cart:updateCount', (countData: { count: string }) => {
	const basketCounterElement = document.querySelector('.header__basket-counter');

	if (basketCounterElement) basketCounterElement.textContent = countData.count;
});

events.on('cartModal:open', () => {
	const modal = new CartModal(events, basketTemplate);

	cart.products.forEach((productData: IProduct) => {
		if (productData.price) {
			const productCard = new Product(events, cardBasketTemplate);
			modal.addProduct(productCard.setData(productData));
			modal.updateBasketPrice(cart.cartPrice);
		}
	});

	modal.open();
});

events.on('deliveryModal:open', () => {
	const formTemplate: HTMLTemplateElement = document.querySelector('#order');
	const modal = new FormModal(events, formTemplate);
	modal.open();
});

events.on('deliveryModal:submit', (eventDetail: { address: string; payment: string }) => {
	order.address = eventDetail.address;
	order.payment = eventDetail.payment;
});

events.on('contactsModal:open', () => {
	const formTemplate: HTMLTemplateElement = document.querySelector('#contacts');
	const modal = new FormModal(events, formTemplate);
	modal.open();
});

events.on('contacntsModal:submit', (eventDetail: { email: string; phone: string }) => {
	const productsIdArr: string[] = [];
	let total = 0;

	cart.products.forEach((product: IProduct) => {
		productsIdArr.push(product.id);
		total += product.price;
	});

	order.total = total;
	order.items = productsIdArr;
	order.email = eventDetail.email;
	order.phone = eventDetail.phone;
	order.order();
});

events.on('order:send', (order: TOrder) => {
	api
		.sendOrder(order)
		.then((response: IOrderSuccess) => {
			cart.clear();

			const modal = new SuccessModal(events, orderTemplate, response);
			modal.open();
		})
		.catch((err) => console.error(err));
});
