import {Component} from "./base/component";
import {IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";

interface IPage {
    counter: number; //- счетчик, значение которого выводится у иконки корзины на главной странице
    catalog: HTMLElement[];
    locked: boolean; //- блокировка скролла страницы при появлении модального окна
}

// Отвечает за наполнение страницы, устанавливает элементы в предназначенные для них контейнеры,
// работает со счетчиком товаров в корзине (выводит обновленное значение)
export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _shoppingCartIcon: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._catalog = ensureElement<HTMLElement>('.gallery');
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._shoppingCartIcon = ensureElement<HTMLElement>('.header__basket');
        this._shoppingCartIcon.addEventListener('click', () => {this.events.emit('shoppingCart:select');});
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}