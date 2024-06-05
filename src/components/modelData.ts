import {
	IModelData,
	IOrder,
	FormErrors,
	IUserDataForm,
	IUserContactsForm,
	IProduct,
} from '../types';

import { IEvents } from './base/events';

// Базовая модель
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}

// Главная модель данных
export class ModelData extends Model<IModelData> {
	catalog: IProduct[];
	shoppingCart: IProduct[] = [];
	preview: string | null; // в поле хранится ID товара, отображаемого в модальном окне
	formErrors: FormErrors = {};
	order: IOrder = {
		// в поле хранятся данные сформированного заказа
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};

	setCatalog(productCards: IProduct[]) {
		this.catalog = productCards;
		this.emitChanges('catalog:change', { catalog: this.catalog });
	}

	// Получение данных одной карточки для ее отображения в модальном окне
	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:change', item);
	}

	addToShoppingCart(item: IProduct) {
		this.shoppingCart.push(item);
		this.emitChanges('shoppingCart:change', item);
	}

	removeFromShoppingCart(item: IProduct) {
		const index = this.shoppingCart.indexOf(item);
		this.shoppingCart.splice(index, 1);
		item.inCart = false;
		this.emitChanges('shoppingCart:change', item);
	}

	// Подсчет количества товаров в корзине для вывода значения у иконки корзины на главной странице
	countShoppingCartItems() {
		return this.shoppingCart.length;
	}

	// Подсчет общей стоимости товаров в корзине
	getTotal() {
		let summ = 0;
		this.shoppingCart.forEach((item) => {
			summ = summ + item.price;
		});

		return summ;
	}

	// Удаление всех товаров из корзины после завершения заказа
	clearShoppingCart() {
		this.shoppingCart = [];
		this.catalog.forEach((item) => {
			item.inCart = false;
		});
	}



	// Добавить в заказ товары из корзины и их общую стоимость
	placeToOrder() {
		this.order.items = this.shoppingCart.map((item) => item.id);
		this.order.total = this.getTotal();
	}

	// Очистка полей заказа после его завершения
	clearOrder() {
		this.order = {
			payment: '',
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0,
		};
	}

	setUserDataField(field: keyof IUserDataForm, value: string) {
		this.order[field] = value;
		if (this.validateUserData()) {
			return;
		}
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
		this.events.emit('UserDataFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0; // Если длина массива равна нулю (ошибок нет),
		// то выражение будет истинным, функция вернёт true
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
		this.events.emit('UserContactsFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
