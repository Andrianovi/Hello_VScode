

//? разрыв коммента
//? разрыв коммента
//? разрыв коммента

//- По это место уже сделан конспект! :)

//*@ 

"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('idForm');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		//- атрибут async означает, что скрипт абсолютно независим. То есть такой скрипт не ждёт загрузки DOM, но и DOM не ждёт загрузки такого скрипта - спасение для медленного интернета. Используятся async скрипты для счётчиков, рекламы и т.д.

		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		//- let f1 = new FormData(form); - за переменной f1 закрепляется объект FormData(form), который кодирует содержимое формы form, для отправки на сервер
		formData.append('image', formImage.files[0]);
		// вставляем в конец собранных, закодированных данных текст 'image' и сам прикреплённый файл

		if (error === 0) {
			//ecли кол-во полей, в которых накосячили = 0
			form.classList.add('_sending');
			//* Ecли, при нажатии на "отправить", косяки = 0, то запиливаем форме ещё один класс '_sending'

			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			//-async function () {
			//		-await promise();
			//-} - await заставит функцию ждать пока не выполнится действие справа от него promise(), работает только c функцией async, в функции без async, await вызовет ошибку
			// let res = fetch('adr', {param}); 
			//* Ждём выполнения отправки, методом 'POST', данных formData, к этой переменной мы приебенили нашу <form></form>, собранных в файле sendmail.php. Файл sendmail.php будет возвращать нам некий JSON ответ
			if (response.ok) {
				//Если ответ от сервера оk,то есть сервера устраивает наш запрос
				let result = await response.json();
				//* дожидаемся ответа сервера
				alert(result.message);
				//* выводим результат в ёбанном всплывающем окне
				formPreview.innerHTML = '';
				//* удаляем картинку прикреплённого файла
				form.reset();
				//* очишает все поля и выборы в <form></form>
				form.classList.remove('_sending');
			} else {
				//Ecли какая-то ошибка или корявый запрос
				alert("Oшибка");
				form.classList.remove('_sending');
			}


		} else {
			// ecли косячных полей чуть больше 0

			alert('заполните обязательные поля');
		}

	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');
		// Поля которые надо проверять

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			// цикл срабатывает для элементов, с классом _req, от первого до последнего элемента, по порядку

			formRemoveError(input);
			// у всех тегов в цикле удаляется класс _error

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					// ecли тег, с class="_req", содержит класс _email и имеет запись похожую на адрес почты

					formAddError(input);
					error++;
				}
				// добавляется класс _error к этому тегу и его родителю; переменная error увеличивается на 1

			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				// иначе (тег с class="_req" должен иметь аттриб type="checbox" и тег не должен быть "выбран" )

				formAddError(input);
				error++;
				// добавляется класс _error к этому тегу и его родителю; переменная error увеличивается на 1
			} else {
				if (input.value === '') {
					// иначе (тег с class="_req" должен иметь хоть какую - то запись, а не сработать это может только с пустым полем в input type="text", т.е. с полями Имя* и E-mail*, так как только у такого инпута value - это текст в поле
					formAddError(input);
					error++;
				}
			}

		}
		return error;
		// то есть результат функции formValidate() - это количество полей в которых накосячили
	}
	// formValidate - просто прощёлкивает поля с классом _req, ничего в них не меняя!

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	// Добавляет класс _error родителю и элементу. Класс родителью добавляется для случаев, когда на странице отображается не сам элемент, а его <label> чтобы в сss написать .родитель._error label{стили}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	// Удаляет класс _error у родителя и элемента

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	// Функция теста email

	//Получаем <input type="file"> в переменную
	const formImage = document.getElementById('formImage');
	//Получаем div, никак не превязанный к вышенаписанному инпуту, в переменную
	const formPreview = document.getElementById('formPreview');

	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
		//как только будет прикреплён файл с картинкой, он сразу передаётся в функцию uploadFile, как переменная, для опытов!
	});

	function uploadFile(file) {
		// проверяем тип файла
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			// если в массиве нет нужного типа файла
			formImage.value = '';
			return;
			//- elem.value='', в <input type="file">, не просто убирает значение, а открепляет файл
		}

		// проверяем размер файла (<3 Мб)
		if (file.size > 3 * 1024 * 1024) {
			// очевидно, если размер (вес) файла больше 3 * 1024 * 1024 байт
			//- elem.size для прикреплённого файла (input1.files[0]) или созданного файла на странице (new Blob([1])) - вес elem в байтах, 1024*1024 = 1 Мб.

			alert('Файл должен быть менее 3 МБ.');
			return;
		}

		var reader = new FileReader();
		//- let r1 = new FileReader(); - закрепляет, за переменной r1. новый объект(FileReader), цель которого читать данные из файлов на странице, вроде созданных blob и прикреплённых input.files[0]
		reader.readAsDataURL(file);
		//- r1.readAsDataURL(file); - означает,что FileReader() или r1 будет читать файл file, как данные для атриб src="", чтобы использовать в тегах, которые этот src используют, вроде img
		reader.onload = function (e) {
			//- r1.onload - событие, которое срабатывает когда все данные из файла file прочитаны
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
			// вставляем в блок div картинку img c src="содержимое прикреплённого файла , прочитанное FileReader cпециально под src"
		};
		reader.onerror = function (e) {
			//- r1.onerror - событие, которое срабатывает при какой-либо ошибке с файлом file
			alert('Ошибка');
		};

	}
});










let zaza = document.querySelector('.zaza');

zaza.addEventListener('click', event1);

async function event1() {
	let resul1 = await fetch('google.com', {
		method: 'GET'
	});
	console.log(resul1);
	console.log(resul1.result);
};















