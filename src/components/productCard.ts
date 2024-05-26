//Слой отображения

import { IProductCardView } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/component';
import { IEvents } from './base/events';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

// Отрисовывает карточку, работает с разметкой
export class ProductCard extends Component<IProductCardView> {
	protected _image: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement;
	protected _button?: HTMLButtonElement;

	Category: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'другое': 'card__category_other',
		'кнопка': 'card__category_button',
	};

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions: ICardActions
	) {
		// В конструктор принимает Dom-элемент темплейта и экземпляр эмиттера
		super(container);
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);
		this._button = container.querySelector(`.${blockName}__button`);
		this._description = container.querySelector(`.${blockName}__description`);
		this._price = container.querySelector(`.${blockName}__price`);
		this._category = ensureElement<HTMLElement>(
			`.${blockName}__category`,
			container
		);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.classList.add(this.Category[value]);
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
		if (value === null && this._button) {
			this._button.disabled = true;
		}
	}

	get price(): number {
		return Number(this._price.textContent) || 0;
	}

	set button(value: string) {
		this.setText(this._button, value);
	}

	set inCart(value: boolean) {
		this.changeButtonDescription(value);
	}

	changeButtonDescription(inCart: boolean) {
		if (inCart) {
			this.button = 'Удалить из корзины';
		} else {
			this.button = 'В корзину';
		}
	}
}
