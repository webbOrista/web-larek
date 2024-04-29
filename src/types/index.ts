// Перечисление, ограничивающее свойство "категория" заданным набором значений

enum EProductCathegory {
	soft = 'софт-скилл',
	hard = 'хард-скилл',
	another = 'другое',
	btn = 'кнопка',
	additional = 'дополнительное',
}

// Перечисление, ограничивающее выбор способа оплаты заданным набором значений

enum EPaymentMethod {
	onDelivery = 'При получении',
	online = 'Онлайн',
}

// Интерфейс, описывающий текущее состояние данных в приложении

export interface IDataState {
	catalog: IProduct[];
	order: IOrder | null;
}

// Интерфейс, описывающий конкретный товар интернет-магазина

export interface IProduct extends ICartItem {
	cathegory: EProductCathegory;
	image: string;
	description?: string;
}

// Интерфейс, описывающий товар, добавленный в корзину

export interface ICartItem {
	id: string;
	title: string;
	price: number;
}

// Интерфейс, описывающий корзину с товарами

export interface ICart {
	items: ICartItem[];
}

// Интерфейс, описывающий форму ввода выбора способа оплаты и адреса доставки

export interface IUserDataForm {
	payment: EPaymentMethod;
	address: string;
}

// Интерфейс, описывающий форму ввода электронной почты и номера телефона

export interface IUserContactsForm {
	email: string;
	phone: string;
}

// Интерфейс, описывающий объект заказа, передаваемый на сервер

export interface IOrder {
	payment: EPaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: IProduct[];
}
