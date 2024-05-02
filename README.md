# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

---

## Данные и типы данных, используемые в приложении

Товар

```
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```

Информация о покупателе

```
export interface ICustomerData {
	payment: string;
	email: string;
	phone: string;
	address: string;
}
```

Успешный заказ

```
export interface IOrderSuccess {
	id: string;
	total: number;
}
```

Данные о виде оплаты и адрес формы доставки

```
export type TDeliveryForm = Pick<ICustomerData, 'payment' | 'address'>
```

Данные покупателя

```
export type TCustomerInfoForm = Pick<ICustomerData, 'email' | 'phone'>
```

Название и цена товара в форме корзины

```
export type TCartForm = Pick<IProduct, 'title' | 'price'>
```

Информация о товаре в форме товара

```
export type TProductCardForm = Pick<IProduct, 'title' | 'description' | 'image' | 'category' | 'price'>
```

Список запросов к апи

```
export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};
```

---

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP:

- слой представления, отвечает за отображение данных на странице,
- слой данных, отвечает за хранение и изменение данных,
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api

Содержит в себе базовую логику отправки запросов. В конструкторе передается базовый адрес сервера и опциональный объект
с заголовками запросов.

Методы:

- `get` - выполняет `GET` запрос на переданный в параметрах эндпоинт и возвращает промис с объектом, которым ответил сервер.
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на
  эндпоинт, переданный как параметр при вызове метода. По умолчанию выполняет `POST` запрос, но метод запроса может быть
  переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в
презентере для обработки событий и в слоях приложения для генерации событий.

Основные методы, реализуемые классом описаны интерфейсом `IEvents`:

- `on` - подписка на событие,
- `emit` - инициализация события,
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

### Слой данных

#### Класс ProductList

Класс отвечает за хранение и логику работу с данными товаров.\
Конструктор класса принимает инстанс брокера событий.\

В полях класса хранятся следующие данные:

- \_total: number - количество товаров,
- \_products: IProduct[] - массив товаров,
- events: IEvents - экземпляр класса `EventEmitter` для вызова событий при изменении данных.

Методы класса:

- getProduct(productId: string): IProduct | undefined - возвращает данные товара по его идентификатору,
- а так же сеттеры и геттеры для сохранения и получения данных из полей класса.

#### Класс Cart

Класс отвечает за хранение и логику работы с данными в корзине.\
Конструктор класса принимает инстанс брокера событий.\

В полях класса хранятся следующие данные:

- \_products: IProduct[] - массив товаров,
- events: IEvents - экземпляр класса `EventEmitter` для вызова событий при изменении данных.

Методы класса:

- addProduct(product: IProduct): void - добавляет продукт в коризну,
- removeProduct(productId: string): void - удаляет продукт из корзины по его идентификатору,
- clear(): void - очищает корзину,
- а так же сеттеры и геттеры для сохранения и получения данных из полей класса.

#### Класс Order

Класс отвечает за хранение данных и логику работы заказа товаров.\
Конструктор класса принимает инстанс брокера событий.\

В полях класса хранятся следующие данные:

- \_total: number - сумма товаров,
- \_items: string - массив идентификаторов товаров,
- events: IEvents - экземпляр класса `EventEmitter` для вызова событий при изменении данных,
- а так же сеттеры и геттеры для сохранения и получения данных из полей класса.

Методы класса:

- order(customerData: ICustomerData): void - принимает информацию о заказчике и совершает заказ.

---

### Слой представления

Все классы представления отвечают за отображение внутри контейнера передаваемых в них данных.

### Класс Product

Реализует отображение карточки товара.\
Устанавливает информацию о карточке (название, описание, цену, изображеине, категорию).\
В конструктор передается инстанс брокера событий и DOM элемента шаблона.\

Поля класса:

- productData: IProduct - информация о товаре.
- events: IEvents - экземпляр класса `EventEmitter` для вызова событий при изменении данных,

Методы класса:

- setProductData(productData: IProduct): void - устанавливает отображение информации о товаре,
- render(): HTMLElement - возвращает настроенный элемент карточки.

### Класс Catalog

Реализует отображения каталога с товарами.\
Предоставляет методы для отображения каталога товаров.\
Конструктор класса принимает массив товаров.

Поля класса:

- products: Product[] - массив товаров.

Методы класса:

- setCatalogData(products: Product[]) - настраивает каталог товаров.
- renderCatalog(): HMTLElement - возвращает каталог товаров.

#### Класс Modal

Реализует модальное окно. Предоставляется методы `open` и `close` для управления отображением модального окна.\
Устанавливает слушателей на клавиатуру, для закрытия модального окна по Esc, на клик вне модального окна и кнопку закрытия окна.\
Конструктор класса принимает инстанс брокера событий.\

Поля класса:

- events: IEvents - экземпляр класса `EventEmitter` для вызова событий при изменении данных,
- open(): void - открывает модальное окно,
- close(): void - закрывает модальное окно.

#### Класс CardModal

Расширяет класс Modal. Предназначен для реализации модального окна с карточкой товара.\
Предоставляет методы для отображения карточки товара.
Конструктор класса принимает информацию о товаре и инстанс брокера событий.

Поля класса:

- product: IProduct - информация о товаре

Методы класса:

- renderProduct(product: IProduct) - отображает товар,
- moveToCart() - перемещает товар в корзину,

#### Класс CartModal

Расширяет класс Modal. Предназначен для реализации модального окна с корзиной.\
Предоставляет методы для отображения товаров и оформления заказа.
Конструктор класса принимает массив товаров для их отображения и инстанс брокера событий.

Поля класса:

- products: IProduct[] - массив товаров

Методы класса:

- renderProducts(products: IProduct[]): void - отображает товары в корзине,
- updateProductCount(): void - обновляет количество товаров в корзине в хедере,
- formalize(): void - оформляет заказ,
- handleRemoveProduct(): void - иницирует событие об удалении товара из корзины.

#### Класс FormModal

Расширяет класс Modal. Предназначен для реализации модальных окон с формами.\
Предоставляет методы для изменения доступности кнопки сабмита в зависимости от правильности введенных данных.\
Конструктор класса принимает форму для отображения, колбэк-функцию для кнопки сабмита и инстанс брокера событий.

Поля класса:

- form: HMTLFormElement - элемент формы
- inputs: NodeListOf<HTMLInputElement> - массив полей ввода.
- submitButton: HTMLButtonElement - кнопка сабмита,
- submitButtonCallback: Function - колбэк кнопки сабмита.

Методы класса:

- checkValidation(input: HTMLInputElement): boolean - проверяет валидность переданного поля ввода,
- enableSubmitButton(): void - включает кнопку сабмита,
- disableSubmitButton(): void - выключает кнопку сабмита.

#### Класс SuccessOrderModal

Расширяет класс Modal. Предназначен для отображения успешного заказа товаров.\
Конструктор класса принимает инстанс брокера событий.

Методы класса:

- handleSuccessButtonClick(): void - закрывает модальное окно.

---

### Слой коммуникации

#### Взаимодейсвтие компонентов

Код, описывающий взаимодействие данных и представления, находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие выполняется за счет событий, которые генерирует брокер событий, и обработчиков этих событий, описанных в `index.ts`.

**Список генерируемых событий:**

События изменения данных:

- `cart:changed` - изменение в корзине.

События представления:

- `cartModal:open` - открытие модального окна с корзиной,
- `cardModal:open` - открытие модального окна с карточкой товара,
- `deliveryModal:open` - открытие модального окна с деталями доставки и оплаты,
- `deliveryModal:submit` - подтверждение данных доставки,
- `contactsModal:open` - открытие модального окна с контактными данными покупателя,
- `contacntsModal:submit` - подтверждение данных личных контактов,
- `order:create` - создание заказа из корзины,
- `order:sent` - оформление заказа,
- `product:added` - добавление товара в корзниу,
- `product:removed` - удаление товара из корзины,
- `payment:online` - выбор оплаты онлайн,
- `payment:offline` - выбор оплаты при получении,
- `productList:changed` - список товаров в каталоге изменен.
