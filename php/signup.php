<?php

// Определение переменных логина, пароля и имени 

$login = filter_var(trim($_POST['login']), 
FILTER_SANITIZE_STRING);
$pass = filter_var(trim($_POST['pass']), 
FILTER_SANITIZE_STRING);
$pass_confirm = filter_var(trim($_POST['pass_confirm']), 
FILTER_SANITIZE_STRING);

// Условия для создания логина, пароля и имени

 if(mb_strlen($login) < 5 || mb_strlen($login) > 90) {
    echo "<p style=\"color: red;\">Длина логина должна быть не менее 5 и не больше 90 символов<p>";
    exit();
 }

 if(mb_strlen($pass) < 2 || mb_strlen($pass) > 24) {
    echo "<p style=\"color: red;\">Длина пароля должна быть не менее 2 и не больше 24 символов<p>";
    exit();
 }

 if(mb_strlen($pass_confirm != $pass)) {
   echo "<p style=\"color: red;\">Пароли не совпадают<p>";
   exit();
}

// Создание хэша пароля

$pass = md5($pass."oernvoi312");

// Подключение к базе данных

 $mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

// Добавление созданных данных о новом пользователе
 $exist_user = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login'");

 if($exist_user->num_rows != 0) {
   echo "<p style=\"color: red;\">Пользователь с таким именем уже существует<p>";
   exit();
 }

 $mysql->query("INSERT INTO `users` (`login`, `pass`, `avatar`) VALUES('$login', '$pass', 'noavatar.png')");

// Отключение от базы данных

$mysql->close();

// Возвращение на основную страницу

header('Location: /');