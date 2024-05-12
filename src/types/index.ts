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


// Интерфейс, описывающий объект товара, возвращаемый сервером

export interface IProduct{
	id: string;
	title: string;
	price: number;
	cathegory: EProductCathegory;
	image: string;
	description?: string;
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


// Необходим для подключения к логике в index.ts
interface ICustomApi extends Api  {
	getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
	orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

// Типизация ответа, который мы принимаем от сервера при завершении заказа (основан на коллекции Postman)
interface IOrderResult  {
	id: string;
	total: number;
}

// Необходим для подключения модели к основной бизнес-логике, содержащейся в index.ts
interface IModel  {
	catalog: IProduct[];
    basket: string[];
    order: IOrder | null;
}


// Типизирует карточку, с его помощью будем создавать экземпляры карточек товаров
interface IProductCardView  {
	title: string;
	price: number;
	cathegory: EProductCathegory;
	image: string;
	description?: string;
}

// Используется при подключении к index.ts
interface IPage  {
	counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

// Необходим для типизации базового компонента (передаем данный тип и превращаем компонент в корзину)
interface IShoppingCartView  {
	items: HTMLElement[];
    total: number;
}

// Позволяет типизировать состояние компонента Form, задает более четкую структуру состояния, чем в родительском компоненте BaseComponent

interface IFormState  {
	valid: boolean;
    errors: string[];
}

// Необходим для типизации полей формы ввода электронной почты и номера телефона в методе модели setFormField 
interface IUserContactsForm  {
	email: string;
	phone: string;
}

// Необходим для типизации полей формы ввода выбора способа оплаты и адреса доставки в методе модели setFormField
interface IUserDataForm {
	payment: EPaymentMethod;
	address: string;
}

// Отрисовывает универсальное модальное окно с кнопкой X и кнопкой закрытия. Вставляет в кнопку Х разный текст, выводит внутри любой переданный контент
interface IPopup  {
	content: HTMLElement;
}

// Позволяет типизировать экземпляр  класса Success
interface ISuccess  {
	total: number;
}