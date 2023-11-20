<?php
$login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING);
$pass = filter_var(trim($_POST['pass']), FILTER_SANITIZE_STRING);
$pass_confirm = filter_var(trim($_POST['pass_confirm']), FILTER_SANITIZE_STRING);
$nickname = filter_var(trim($_POST['nickname']), FILTER_SANITIZE_STRING);
$phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_STRING);
$city = filter_var(trim($_POST['city']), FILTER_SANITIZE_STRING);

$pass_hashed = md5($pass."oernvoi312");

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$exist_user = $mysql->query("SELECT * FROM `users` WHERE `login` = '$login'");
$exist_email = $mysql->query("SELECT * FROM `users` WHERE `email` = '$email'");
$exist_phone = $mysql->query("SELECT * FROM `users` WHERE `phone` = '$phone'");

if($exist_user->num_rows != 0) {
   echo json_encode(array("message" => "existing_login"));
   exit();
} else if($exist_email->num_rows != 0) {
   echo json_encode(array("message" => "existing_email"));
   exit();
} else if($exist_phone->num_rows != 0) {
   echo json_encode(array("message" => "existing_phone"));
   exit();
}

$result = $mysql->query("INSERT INTO `users` (`login`, `pass`, `nickname`, `city`, `phone`, `email`, `about`, `rating`, `avatar`) 
VALUES ('$login', '$pass_hashed', '$nickname', '$city', '$phone', '$email', '', '0', 'noavatar.png')");

$mysql->close();

echo json_encode(array("message" => "register_succesful"));
exit();
?>