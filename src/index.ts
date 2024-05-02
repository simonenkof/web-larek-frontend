import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ProductList } from './components/ProductList';

const events = new EventEmitter();
const productList = new ProductList(events);
