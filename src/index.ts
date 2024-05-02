import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { IProduct } from './types';

const events = new EventEmitter();
const productList = new ProductList(events);
const cart = new Cart(events);
