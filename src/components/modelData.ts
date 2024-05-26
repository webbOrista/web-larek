import {
	IModelData,
	IOrder,
	FormErrors,
	IUserDataForm,
	IUserContactsForm,
	IProduct,
} from '../types';

import { IEvents } from './base/events';

export interface catalogChangedEvent {
	products: IProduct[];
}

// Базовая модель
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	// Сообщить всем что модель поменялась
	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}

// Главная модель данных, хранит массив товаров каталога, массив товаров корзины, данные заказа

export class ModelData extends Model<IModelData> {
	catalog: IProduct[]; //- массив товаров каталога
	shoppingCart: IProduct[] = []; //- массив товаров в корзине
	preview: string | null; // здесь хранится  айдишник того товара, который хотим показать в модалке
	formErrors: FormErrors = {};
	order: IOrder = {
		payment: 'online', // значение по умолчанию, чтобы не лагала валидация
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};

	setCatalog(productCards: IProduct[]) {
		this.catalog = productCards;
		this.emitChanges('catalog:changed', { catalog: this.catalog });
	}
	

	// Получение одной карточки для отображения в модалке
	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	} 

	addToShoppingCart(item: IProduct) {
		this.shoppingCart.push(item);
	}

	removeFromShoppingCart(item: IProduct) {
		const index = this.shoppingCart.indexOf(item);
		this.shoppingCart.splice(index, 1);
	}

	clearShoppingCart() {
		this.shoppingCart = [];
			}

	// Разместить в заказе товары из корзины
	placeToOrder(): void {
		this.order.items = this.shoppingCart.map((item) => item.id);
	}

	resetOrder(): IOrder {
		return {
			payment: 'online',
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0,
		};
	}

	clearOrder(): void {
		this.order = this.resetOrder();
	}

	getTotal() {
		let summ = 0;
		this.shoppingCart.forEach((item) => {
			summ = summ + item.price;
		});

		return summ;
		//получить итоговую сумму заказа
	}

	countShoppingCartItems() {
		return this.shoppingCart.length;
	}

	setUserDataField(field: keyof IUserDataForm, value: string) {
		this.order[field] = value;
		if (this.validateUserData()) {
			return;
		}
	}

	clearUserData() {
		this.order.address = '';
		this.order.payment = '';
	}

	validateUserData(): boolean {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес доставки';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0; // - если длина массива равна нулю (ошибок нет), то выражение будет истинным и функция вернёт true
	}

	setUserContactsField(field: keyof IUserContactsForm, value: string) {
		this.order[field] = value;

		if (this.validateUserContacts()) {
			return;
		}
	}

	validateUserContacts(): boolean {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	clearUserContacts() {
		this.order.email = '';
		this.order.phone = '';
	}
}
