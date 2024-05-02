import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { API_URL } from './utils/constants';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Order } from './components/Order';

const events = new EventEmitter();
const productList = new ProductList(events);
const cart = new Cart(events);
const order = new Order(events, new Api(API_URL));
