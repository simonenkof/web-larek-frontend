import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { AppApi } from './components/AppApi';
import { API_URL } from './utils/constants';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Order } from './components/Order';
import { Product } from './components/Product';
import { IProduct } from './types';
import { CardModal } from './components/CardModal';
import { CartModal } from './components/CartModal';

const events = new EventEmitter();
const api = new AppApi(new Api(API_URL));
const productList = new ProductList(events);
const cart = new Cart(events);
const order = new Order(events);
const basketButton = document.querySelector('.header__basket');

basketButton.addEventListener('click', () => events.emit('cartModal:open'));

api.getProducts().then((products) => (productList.items = products.items));

events.on('productList:changed', (products: IProduct[]) => {
	products.forEach((productData: IProduct) => {
		const productTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
		const product = new Product(events, productTemplate);
		const galery = document.querySelector('.gallery');

		galery.append(product.setData(productData));
	});
});

events.on('cardModal:open', (product: Product) => {
	api.getProductById(product.id).then((productData: IProduct) => {
		const productTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
		const product = new Product(events, productTemplate);
		const modal = new CardModal(events, product.setData(productData), productData);

		modal.open();
	});
});

events.on('cart:add', (product: IProduct) => cart.addProduct(product));
events.on('cart:remove', (product: Product) => cart.removeProduct(product));

events.on('cart:updateCount', (countData: { count: string }) => {
	const basketCounterElement = document.querySelector('.header__basket-counter');

	if (basketCounterElement) basketCounterElement.textContent = countData.count;
});

events.on('cartModal:open', () => {
	const productTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
	const cartTemplate: HTMLTemplateElement = document.querySelector('#basket');
	const modal = new CartModal(events, cartTemplate);

	cart.products.forEach((productData: IProduct) => {
		if (productData.price) {
			const productCard = new Product(events, productTemplate);
			modal.addProduct(productCard.setData(productData));
			modal.updateBasketPrice(cart.cartPrice);
		}
	});

	modal.open();
});
