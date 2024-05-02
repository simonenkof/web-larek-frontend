import { IEvents } from './base/events';
import { IOrder } from '../types';

export class Order implements IOrder {
	protected _total: number;
	protected _items: string[];
	protected _payment: string;
	protected _email: string;
	protected _phone: string;
	protected _address: string;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	get total(): number {
		return this._total;
	}

	set total(value: number) {
		this._total = value;
	}

	get items(): string[] {
		return this._items;
	}

	set items(value: string[]) {
		this._items = value;
	}

	get payment(): string {
		return this._payment;
	}

	set payment(value: string) {
		this._payment = value;
	}

	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get phone(): string {
		return this._phone;
	}

	set phone(value: string) {
		this._phone = value;
	}

	get address(): string {
		return this._address;
	}

	set address(value: string) {
		this._address = value;
	}

	order(): void {
		console.log();
	}
}
