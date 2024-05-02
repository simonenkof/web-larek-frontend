import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { IProduct } from './types';

const events = new EventEmitter();
const productList = new ProductList(events);
const cart = new Cart(events);

const tst1: IProduct = {
	id: '854cef69-976d-4c2a-a18c-2aa45046c390',
	description: 'Если планируете решать задачи в тренажёре, берите два.',
	image: '/5_Dots.svg',
	title: '+1 час в сутках',
	category: 'софт-скил',
	price: 750,
};

const tst2: IProduct = {
	id: 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9',
	description: 'Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.',
	image: '/Shell.svg',
	title: 'HEX-леденец',
	category: 'другое',
	price: 1450,
};

const tst3: IProduct = {
	id: 'b06cde61-912f-4663-9751-09956c0eed67',
	description: 'Будет стоять над душой и не давать прокрастинировать.',
	image: '/Asterisk_2.svg',
	title: 'Мамка-таймер',
	category: 'софт-скил',
	price: null,
};

cart.products = [tst1, tst2, tst3];
cart.removeProduct(tst3.id);
