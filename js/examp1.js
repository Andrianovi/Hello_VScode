




/* 
const requestURL = 'https://jsonplaceholder.typicode.com/users';
// requestURL - адрес страницы в нете

const xhr = new XMLHttpRequest();

//@   const xhr = new XMLHttpRequest(); - закрепляем за переменной xhr, объект XMLHttpRequest, который позволяет делать запросы к серверу, тобишь по адресам страниц в нете, без перезагрузки страницы

xhr.open('GET', requestURL);
//@   xhr.open ('метод', адрес стран) - соединит с адресом 

 */

function f1() {
	// создаём объект запроса
	const xhr = new XMLHttpRequest();
	//@   const xhr = new XMLHttpRequest(); - закрепляем за переменной xhr, объект XMLHttpRequest, который позволяет делать запросы к серверу, тобишь по адресам страниц в нете, без перезагрузки страницы

	// куда посылаем и параметры
	xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=691904&units=metric&APPID=f7922902abd3107e3ef9cb6a812c4d36');
	//@   xhr.open ('метод', 'adr1') - запускает соединение с адресом стран adr1, 'методом' который может быть:
	//*   'GET' - получить определённый ресурс
	//*   'POST' - отправить информацию
	//*   'DELETE' - удаление информации
	//*   'PUT' - замещение информации

	// как обрабатываем ответ от сервера
	xhr.onload = function () {
		console.log(xhr.status);
		//@ xhr.status - код состояния , еслия от 100 до 199 - информационный, 200-299 - успешный, 300-399 - перенаправление, 400-499 - клиентская ошибка, 500-599 - серверная ошибка
		console.log(xhr.response);
		//@ xhr.response - сам ответ сервера

		const data = JSON.parse(xhr.response);
		console.log(data);
		//@ JSON.parse(xhr.response) - преобразует ответ сервера в массив, с которым удобно взаимодействовать, необходимо делать именно в xhr.onload
	}
	//@   xhr.onload = function () {код действия}- когда сервер присылает ответ, происходит "код действия"

	// посылаем запрос, без этого не работает
	xhr.send();
};
f1();
