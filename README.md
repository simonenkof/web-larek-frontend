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
	price: number;
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

- setProducts(): void - обращается к серверу и устанавливает массив товаров,
- getProduct(productId: string): IProduct - возвращает данные товара по его идентификатору,
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
- clear(): void - очищает корзину.

#### Класс Order

Класс отвечает за хранение данных и логику работы заказа товаров.\
Конструктор класса принимает инстанс брокера событий.\
В полях класса хранятся следующие данные:

- \_total: number - сумма товаров,
- \_items: string - массив идентификаторов товаров,
- events: IEvents - экземпляр класса `EventEmitter` для вызова событий при изменении данных.

Методы класса:

- order(customerData: ICustomerData): void - принимает информацию о заказчике и совершает заказ
