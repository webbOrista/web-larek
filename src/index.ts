import './scss/styles.scss';

import { ModelData, catalogChangedEvent } from './components/modelData';
import { EventEmitter } from './components/base/events';
import { CustomAPI } from './components/customApi';
import { API_URL, CDN_URL } from './utils/constants';
import { ProductCard } from './components/productCard';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/page';

const events = new EventEmitter();
const api = new CustomAPI(CDN_URL, API_URL);

const appData = new ModelData({}, events);

events.onAll((events)=>{console.log(events.eventName, events.data)})// Выводим все события в консоль для тестирования

const cardTemlate = ensureElement<HTMLTemplateElement>('#card-catalog');

const page = new Page(document.body, events);


// Получение данных карточек товарав с сервера
api.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});




events.on<catalogChangedEvent>('catalog:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new ProductCard('card', cloneTemplate(cardTemlate), {
			onClick: () => events.emit('productCard:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

const testUniqueProduct = {
	id: '854cef69-976d-4c2a-a18c-2aa45046c390',
	description: 'Если планируете решать задачи в тренажёре, берите два.',
	image: '/5_Dots.svg',
	title: '+1 час в сутках',
	category: 'софт-скил',
	price: 750,
};



















    // api.orderProducts(appData.order)
    // .then((data) => console.log(data))
	// .catch((err) => {
	// 	console.error(err);
	// });   





