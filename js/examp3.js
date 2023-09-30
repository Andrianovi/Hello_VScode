
/* 
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

//@  похожесть между true в xhr.open() и использованием async и await с fetch() заключается в том, что оба позволяют выполнять асинхронные HTTP-запросы */
let a = 7;
/* 
setTimeout(() => {
	a = 99;
	console.log(a);
}, 2000);
 */
console.log(a);
let c = 15;
let b = new Promise(function (resolve, reject) {

	setTimeout(() => {
		c = 32;

	}, 1500);
	setTimeout(() => {
		resolve(a = 99);
	}, 1000);
	//reject(console.log('ну блин'));






});

b.then(function () {
	console.log(a);
	console.log(c);
});

if (a > 8) {
	console.log('кажись понял');
};


/* 
document.body.addEventListener('click', function () {
	console.log('Mega ТЫК!');
});
 */
let z = new Promise(function (res, rej) {
	document.body.addEventListener('click', function () {
		res();
	});
	setTimeout(() => rej(), 10000);

});
z.then(function () {
	console.log('Mega ТЫК!');
}, function () {
	/* 
	const bl1 = document.createElement('div');
	bl1.innerHTML = `
<h1 class="form__title" style='max-width:100%; text-align:center;'>Хули ждём, тыкать то по странице кто будет?</h1>
`;
	document.body.prepend(bl1);
 */




	console.log('ошибка!');
}
);