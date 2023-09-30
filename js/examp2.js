

//@ https://jsonplaceholder.typicode.com - сервис который предоставляет нам фейковый онлайн рест апи для тестирования

const url = 'https://jsonplaceholder.typicode.com/todos'

// Закрепляем за url адрес из примера на сервисе для тестирования
var xhttp1 = new XMLHttpRequest();
xhttp1.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		callbackFunction(this.responseText);
		console.log('xhttp1 сработал!');
	}
};
//* . когда вы отправляете запрос на сервер с помощью XMLHttpRequest, объект XMLHttpRequest переходит через различные состояния, и каждый раз, когда состояние меняется, функция, установленная в onreadystatechange, вызывается.
//@ Свойство onreadystatechange используется в JavaScript для установки функции обратного вызова (callback), которая будет выполняться каждый раз, когда изменяется состояние объекта XMLHttpRequest при отправке или получении данных с сервера.

xhttp1.open("GET", "https://jsonplaceholder.typicode.com/todos", true);

//@ xhr.open ('метод', 'adr1', true) -  похожесть между true в xhr.open() и использованием async и await с fetch() заключается в том, что оба позволяют выполнять асинхронные HTTP-запросы