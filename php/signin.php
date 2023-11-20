<?php
$login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING);
$pass = filter_var(trim($_POST['pass']), FILTER_SANITIZE_STRING);

$pass = md5($pass."oernvoi312");

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$result = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login'  AND `pass` = '$pass'");
$user = $result->fetch_assoc();

if($result->num_rows == 0) {
    echo json_encode(array("message" => "wrong_input"));
    exit();
}

setcookie('user_id', $user['id'], time() + 518400 * 24, "/");

$mysql->close();

echo json_encode(array("message" => "login_succesful"));
?>