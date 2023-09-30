var mon = 15;
var tue = 17;
var a = 'alex';
var b = 17;
var c = 43568874;
var d = 5;
//console.log(c);
var mas = ['alex', 17, 5, true]; //индексный
mas[100] = 'Hello';
var z = 2;
console.log(mas);

var out = "";

for (var i = 0; i < mas.length; i++) {
	if (mas[i] != undefined) {
		out += mas[i] + ' ';
	}
};
document.querySelector('#out').innerHTML += out;

//* JSON - формат обмена данных между множеством языков программирования и устройств, похож на запись сниппетов
//* для проверки правильности записи в JSON можно скопировать текст на сайте https://jsonformatter.curiousconcept.com/# и нажать process

var m = {
	"name": "Sergei",
	"age": 44,
	"sex": "male",
	"iin": 4546,
	"phone": [
		"+38050889988",
		"+790766553535"
	],
	"email": {
		"gmail": "serg@gmail.com",
		"yahoo": "serg@yahoo.com"
	}
};
console.log(m);
//*Данные на сервер можно отправлять только в виде строки, и присылает сервер на запрос тоже строку, может помочь подобный перегон:
//@ Массив в строку
var str = JSON.stringify(m);
console.log(str);
//@ Cтроку в массив
console.log(JSON.parse(str));

// AJAX -











