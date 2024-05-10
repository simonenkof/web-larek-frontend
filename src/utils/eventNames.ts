export enum EventNames {
	CartAdd = 'cart:add', // Событие добавления товара в корзину
	CartUpdateCount = 'cart:updateCount', // Событие обновление количества товаров в корзине
	CartRemoved = 'cart:removed', // Событие удаленного товара из корзины
	CartUpdatePrice = 'cart:updatePrice', // Событие обновления цены товара в корзине
	CartCleared = 'cart:cleared', // Событие очистки корзины
	CartRemove = 'cart:remove', // Событие удаления товара из корзины
	DeliveryModalOpen = 'deliveryModal:open', // Событие открытия модального окна с выбором способа оплаты и адреса доставки
	DeliveryModalSubmit = 'deliveryModal:submit', // Событие подтверждения формы оплаты и адреса доставки
	ContactsModalOpen = 'contactsModal:open', // Событие открытия модального окна с вводом контактных данных
	ContactsModalSubmit = 'contacntsModal:submit', // Событие подтверждения формы контактных данных
	OrderSend = 'order:send', // Событие отправки заказа
	CardModalOpen = 'cardModal:open', // Событие открытия модального окна с карточкой товара
	ProductListChanged = 'productList:changed', // Событие изменения списка товаров
}
