<?php
$login = filter_var(trim($_POST['login']), 
FILTER_SANITIZE_STRING);
$pass = filter_var(trim($_POST['pass']), 
FILTER_SANITIZE_STRING);

$pass = md5($pass."oernvoi312");

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$result = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login'  AND `pass` = '$pass'");
$user = $result->fetch_assoc();
if(count($user) == 0) {
    echo "Такой пользователь не найден";
    exit();
}

setcookie('user', $user['login'], time() + 3600 * 24, "/");
setcookie('avatar', $user['avatar'], time() + 3600 * 24, "/");
setcookie('user_id', $user['user_id'], time() + 3600 * 24, "/");

$mysql->close();

header('Location: /');