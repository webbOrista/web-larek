import { IFormState } from "../types";
import { Component } from "./base/component";

export class Form extends Component<IFormState> {
	// valid: boolean; // 
    // errors: string[]; //  

	// button: HTMLButtonElement // -  кнопка отправки формы
	// formErrors: HTMLElement // - сообщения об ошибках при валидации
	// constructor(){
    //     super(container)
	// }

	onInputChange() {


	}

	setInputValues(){


	} // Заполнить форму какими-лиибо данными при открытии

	getInputValues(){} 
	// Получить данные введенные пользователем в форму

	setError(){} // установить конкретное сообщение об ошибке для конкретного поля формы

	showInputError(){

	}

	hideInputError(){}



}