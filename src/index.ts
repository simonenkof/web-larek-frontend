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

const events = new EventEmitter();
const api = new AppApi(new Api(API_URL));
const productList = new ProductList(events);
const cart = new Cart(events);
const order = new Order(events);

api.getProducts().then((products) => (productList.items = products.items));

events.on('productList:changed', (products: IProduct[]) => {
	products.forEach((productData: IProduct) => {
		const productTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
		const product = new Product(events, productTemplate);
		const galery = document.querySelector('.gallery');

		galery.append(product.setData(productData));
	});
});
