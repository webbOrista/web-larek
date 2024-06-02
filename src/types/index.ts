// Интерфейс, описывающий объект товара, возвращаемый сервером
export interface IProduct {
	id: string;
	title: string;
	price: number | null;
	category: string;
	image: string;
	description: string;
}

// Интерфейс, описывающий объект заказа, передаваемый на сервер
export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IModelData {
	catalog: IProduct[];
	shoppingCart: string[];
	preview: string | null;
}

export interface catalogChangedEvent {
	products: IProduct[];
}

export interface IProductCardView extends IProduct {
	inCart: boolean;
	cartItemIndex?: number;
}

export interface IUserContactsForm {
	email: string;
	phone: string;
}

export interface IUserDataForm {
	payment: string;
	address: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
