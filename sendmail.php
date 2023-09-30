<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
//* Подключение файлов из папки PHPMailer, чтобы это плагин заработал

$mail = new PHPMailer(true);
//* Объявление этого плагина
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
//* Подключение языкового файла из той же папки PHPMailer
$mail->IsHTML(true);
//* Включаем возможность присутствия HTML тега в письме

//От кого письмо
$mail->setFrom('andrei43043721@yandex.ru', 'Андрей прграммирующий!');
//Кому отправить
$mail->addAddress('andrei43043721@yandex.ru');
//Тема письма
$mail->Subject = 'Если я это читаю, значит вся ебля с горой уроков не напрасна!!!';

//Рука
$hand = "Правая";
if($_POST['hand'] == "left"){
	$hand = "Левая";
}

//Tекст письма
$body = '<h1>Встречайте супер письмо!</h1>';

if(trim(!empty($_POST['name']))){
	//* проверка на пустоту поля
	$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}

if(trim(!empty($_POST['email']))){
	$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['hand']))){
	$body.='<p><strong>Рука:</strong> '.$hand.'</p>';
}

if(trim(!empty($_POST['age']))){
	$body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
}

if(trim(!empty($_POST['message']))){
	$body.='<p><strong>Cooбщение:</strong> '.$_POST['message'].'</p>';
}

//Прикрепить файл
if (!empty($_FILES['image']['tmp_name'])) {
	//* проверка наличия файла
	//путь загрузки файла
	$filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
	//грузит файл
	if (copy($_FILES['image']['tmp_name'], $filePath)){
		$fileAttach = $filePath;
		$body.='<p><strong>Фото в приложении</strong></p>';
		$mail->addAttachment($fileAttach);
		//* прикрепит файл к письму
}

$mail->Body = $body;
//* собранная $bode присваивается в плагин

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else {
$message = 'Данные отправлены!';
}

$response = ['message' => $message];
//* формируем из этого формат json

header('Content-type: application/json');
echo json_encode($response);
//* И, с заголовком json, возвращаем в наш javaScript
?>