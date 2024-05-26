
// import {API_URL, CDN_URL} from "utils/constants";

import { Component } from "../components/base/component";
import {ensureElement} from "../utils/utils";
import {IEvents} from "../components/base/events";

// Интерфейс, описывающий объект товара, возвращаемый сервером

export interface IProduct{
	id: string;
	title: string;
	price: number|null;
	category: string;
	image: string;
	description: string;
	inCart?:boolean;
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




// Типизация ответа от сервера при завершении заказа
export interface IOrderResult  {
	id: string;
	total: number;
}


export interface IModelData  {
	catalog: IProduct[];
    shoppingCart: string[];
	preview:string|null;
}


export interface IProductCardView  {
	title: string;
	price: number;
	category: string;
	image: string;
	description: string;
	button?: HTMLButtonElement;
}

// Необходим для типизации базового компонента (передаем данный тип и превращаем компонент в корзину)
export interface IShoppingCartView  {
	items: HTMLElement[];
    total: number;
}

// Позволяет типизировать состояние компонента Form, задает более четкую структуру состояния, чем в родительском компоненте Component

export interface IFormState  {
	valid: boolean;
    errors: string[];
}

// Необходим для типизации полей формы ввода электронной почты и номера телефона 
export interface IUserContactsForm  {
	email: string;
	phone: string;
}

// Необходим для типизации полей формы ввода выбора способа оплаты и адреса доставки
export interface IUserDataForm {
	payment: string;
	address: string;
}

// Отображает модальное окно, выводит внутри окна переданный контент
export interface IPopup  {
	content: HTMLElement;
}

// Позволяет типизировать экземпляр  класса Success
export interface ISuccess  {
	total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;























