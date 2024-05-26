import { IShoppingCartView } from "../types";

// Отрисовывает корзину с ее содержимым
export class ShoppingCart implements IShoppingCartView {
	items: HTMLElement[];
    total: number;
	button: HTMLElement;

	constructor(){

	}

}