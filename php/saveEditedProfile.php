<?php

$data = json_decode(file_get_contents('php://input'));

$id = $data->id;
$login = $data->login;
$nickname = $data->nickname;
$city = $data->city;
$phone = $data->phone;
$email = $data->email;
$about = $data->about;

$mysql = new mysqli('127.0.0.1', 'root', '', 'ans');

$exist_user = $mysql->query("SELECT * FROM `users` WHERE `nickname` = '$nickname'");
$exist_email = $mysql->query("SELECT * FROM `users` WHERE `email` = '$email'");

if($exist_user->num_rows != 0) {
   $exist_user_result = $exist_user->fetch_assoc();
   if($exist_user_result['id'] != $id) {
    echo json_encode(array("message" => "existing_nickname"));
    exit();
   }
} else if($exist_email->num_rows != 0) {
   $exist_email_result = $exist_email->fetch_assoc();
   if($exist_email_result['id'] != $id) {
    echo json_encode(array("message" => "existing_email"));
    exit();
   }
}

$mysql->query("UPDATE `posts` SET 
`user_name` = '$nickname',
`user_phone` = '$phone'
 WHERE `user_id` = '$id'");

$mysql->query("UPDATE `users` SET 
`nickname` = '$nickname',
`city` = '$city',
`phone` = '$phone',
`email` = '$email',
`about` = '$about'
WHERE `id` = '$id'");

$mysql->query("UPDATE `reviews` SET 
`author_name` = '$nickname'
WHERE `id` = '$id'");

setcookie('user', $nickname, time() + 518400 * 24, "/");

$mysql->close();

echo json_encode(array("message" => "saving_succesful"));

?>